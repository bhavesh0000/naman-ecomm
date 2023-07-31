const express = require("express")

const app = express()

app.use(express.json())
// Routes imports

const product = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")

app.use("/api/v1",product)
app.use("/api/v1/users", userRoutes);

module.exports = app