import { object, number, string, TypeOf } from "zod";
import mongoose  from "mongoose";

const params = {
  params: object({
    _Id: string({
      required_error: "Id is required",
    }),
  }),
};

const payload = {
    body: object({
      name: string({
        required_error: "Name is required",
      }),
      description: string({
        required_error: "desc is required",
      }),
      image: string({
        required_error: "image is required",
      }),
      ring_no: number({
        required_error: "Ring no is required",
      }),
      family_code: string({
        required_error: "family code is required",
      }),
    }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
