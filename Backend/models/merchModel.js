const { Schema, model } = require("../connection");
const myschema = new Schema({
  title: String,
  price: Number,
  image: String,
  category: String,
  createdAt: { type: Date },
});
module.exports = model("merchandise", myschema);
