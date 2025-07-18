const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  image: String,
  countInStock: Number,
});

exports.Category = mongoose.model("Category", categorySchema);
