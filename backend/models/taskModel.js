import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  task: String,
});

const TodoModel = mongoose.model("todos", productSchema);
export default TodoModel;
