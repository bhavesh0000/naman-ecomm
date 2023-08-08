const mongoose = require("mongoose")
const validator = require("validator")

const bcrypt = require("bcryptjs");

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
        
        password:{
            type: String,
            required: [true, "Please enter password."],
            validate: {
                validator: function (value) {
                  // Password must contain minimum 8 characters, at least 1 uppercase letter, 1 special character, and 1 number
                  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
                  return passwordRegex.test(value)
                },
                message: "Password must contain minimum 8 characters, at least 1 uppercase letter, 1 special character, and 1 number."
              },
             },
             avatar: {
                public_id: {
                  type: String,
                  default: "default-avatar-public-id", // set a default public_id if needed
                },
                url: {
                  type: String,
                  default: "default-avatar-url.png", // set a default URL if needed
                },
              },
              resetPasswordToken: {
                type: String,
                default: null, // Initially, there is no reset token
              },
              resetPasswordTokenExpiration: {
                type: Date,
                default: null, // Initially, there is no reset token expiration date
              },
},{
    timestamps:true
})
userSchema.pre("save", hashPassword);
module.exports = mongoose.model("User", userSchema)




