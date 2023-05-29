import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
  } from "mongoose"; 
  import birdModel, { birdDocument } from "../models/bird.model";
  
  export async function createProduct(
    input: DocumentDefinition<Omit<birdDocument, "createdAt" | "updatedAt">>
  ) {
    return birdModel.create(input);
  }
  
  export async function findProduct(
    query: FilterQuery< birdDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return birdModel.findOne(query, {}, options);
  }
  
  export async function findAndUpdateProduct(
    query: FilterQuery< birdDocument>,
    update: UpdateQuery< birdDocument>,
    options: QueryOptions
  ) {
    return birdModel.findOneAndUpdate(query, update, options);
  }
  
  export async function deleteProduct(query: FilterQuery< birdDocument>) {
    return birdModel.deleteOne(query);
  }