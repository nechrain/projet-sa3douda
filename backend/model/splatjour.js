const mongoose = require("mongoose");
const splatjourSchema = new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  ingredient: { type: String },
  price: { type: Number },
  region: { type: String },
  gouvernorat: { type: String },
});
module.exports = mongoose.model("lesplatsdusannefa", splatjourSchema);
