const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true,
              },
              totalProductAmount: {
                type: Number,
                required: true,
              }
            }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryAddress: { // Add delivery address field
        address: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          pincode: {
            type: String,
            required: true,
          },
          phoneNumber: {
            type: String,
            required: true,
          }
      },
      billingAddress: { // Add billing address field
        address: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            required: true,
          },
          country: {
            type: String,
            required: true,
          },
          city: {
            type: String,
            required: true,
          },
          pincode: {
            type: String,
            required: true,
          }
      },
      offers: {
        type: String,
        default: "",
      },
    createdAt:{
        type: Date,
        default: Date.now
    },
   deleveredAt:  Date,
})
    
   // Calculate totalProductAmount for each product and totalAmount for the order
 orderSchema.pre("save", function (next) {
    this.products.forEach((product) => {
      product.totalProductAmount = product.quantity * product.price;
    });
  
    this.totalAmount = this.products.reduce(
      (total, product) => total + product.totalProductAmount,
      0
    );
  
    next();
  })
  



module.exports = mongoose.model("Order", orderSchema)