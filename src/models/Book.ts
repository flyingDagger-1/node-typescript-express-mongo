import { Document, Model, Schema, model } from 'mongoose';

export interface IBook extends Document {
  /** Name of the book */
  name: string;
  /** Name of the author */
  author: string;
}

type BookModel = Model<IBook>;

const schema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
});

const Book: BookModel = model<IBook, BookModel>('Book', schema);

export default Book;
