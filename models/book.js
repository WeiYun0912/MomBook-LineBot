import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  publishId: String,
  authorId: String,
  ISBN: String,
});

export default mongoose.model("Book", bookSchema);
