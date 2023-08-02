const express = require("express")

const app = express()

app.use(express.json())
// Routes imports

const product = require("./routes/productRoutes")
const user = require("./routes/userRoutes")

app.use("/api/v1",product)
app.use("/api/v1", user);

module.exports = app