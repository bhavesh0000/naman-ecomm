const express = require("express")

const app = express()
const errorUtils = require("../backend/utils/errorHandler")

app.use(express.json())
// Routes imports

const product = require("./routes/productRoutes")
const user = require("./routes/userRoutes")

app.use("/api/v1",product)
app.use("/api/v1", user);



app.use(errorUtils)

module.exports = app