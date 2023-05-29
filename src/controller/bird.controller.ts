import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/bird.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/bird.service";
import birdModel from "../models/bird.model";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });

  return res.send(product);
}

export async function updateProductHandler(
  req: Request,
  res: Response
) {
  const userId = res.locals.user._id;
  const update = req.body;

  const product = await findProduct({_id: req.params._Id});

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({_id: req.params._Id}, update, {
    new: true,
  });

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: Request,
  res: Response
) {
  const product = await birdModel.findOne({_id: req.params._Id});
  //.populate({path:"parent_id"});

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function deleteProductHandler(
  req: Request,
  res: Response
) {
  const userId = res.locals.user._id;

  const product = await findProduct({_id: req.params._Id});

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({_id: req.params._Id});

  return res.sendStatus(200);
}
