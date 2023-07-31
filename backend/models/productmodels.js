const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product price"],
    min: 0,
    max: 999999,
    set: (price) => parseFloat(price.toFixed(2)),
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the product category"],
    enum: ["Necklaces", "Earrings", "Bracelets", "Rings", "Pendants"],
  },
  material: {
    type: String,
    required: [true, "Please enter the product material"],
  },
  style: {
    type: String,
    required: [true, "Please enter the product style"],
  },
  gemstone: {
    type: String,
    required: [true, "Please enter the gemstone used"],
  },
  weight: {
    type: Number,
    required: [true, "Please enter the product weight"],
    min: 0,
  },
  sizes: [
    {
      size: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

