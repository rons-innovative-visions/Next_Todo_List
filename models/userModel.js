import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: String,
    _id: mongoose.Schema.Types.ObjectId,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    todos: [todoSchema],
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;