const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todo",
    },
  ],
});
module.exports = mongoose.model("user", userSchema);
