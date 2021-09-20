const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let imageSchema = new Schema({
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Image", imageSchema);
