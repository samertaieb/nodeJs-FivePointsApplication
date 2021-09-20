const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let todoSchema = new Schema({
  type: {
    type: String,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("todo", todoSchema);
