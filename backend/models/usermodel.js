const mongoose = require("mongoose")
const validator = require("validator")

const { hashPassword } = require("../middleware/userMiddleware");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your full name."]
        },

        email:{
            type: String,
            required: [true, "Please enter your email address."],
            unique:[true,"Email address already exist"],
            validate: {
                validator: validator.isEmail, // Use isEmail validator from the validator library
                message: "Please enter a valid email address.",
              },
        }, 
        
        Password:{
            type: String,
            required: [true, "Please enter password."],
            validate: {
                validator: function (value) {
                  // Password must contain minimum 8 characters, at least 1 uppercase letter, 1 special character, and 1 number
                  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
                  return passwordRegex.test(value);
                },
                message:
                  "Password must contain minimum 8 characters, at least 1 uppercase letter, 1 special character, and 1 number.",
              },
             },
             avatar: {
                public_id: {
                  type: String,
                  default: "default-avatar-public-id", // You can set a default public_id if needed
                },
                url: {
                  type: String,
                  default: "default-avatar-url.png", // You can set a default URL if needed
                },
              },
},{
    timestamps:true
})
// Apply the hashPassword middleware to hash the user's password before saving
userSchema.pre("save", hashPassword);
module.exports = mongoose.model("User", userSchema)




