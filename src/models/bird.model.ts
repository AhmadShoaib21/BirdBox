
import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import autopopulate from "mongoose-autopopulate";

export interface birdDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  description: string;
  ring_no: Number;
  image: string;
  family_code: string;
  createdAt: Date;
  updatedAt: Date;
}

const birdSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ring_no: { type: Number, required: true, unique: false },
    family_code: { type: String, required: true },
    parent_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "bird", autopopulate: true },
    ],
  },
  {
    timestamps: true,
  }
);
birdSchema.plugin(autopopulate);
const birdModel = mongoose.model<birdDocument>("bird", birdSchema);

export default birdModel;