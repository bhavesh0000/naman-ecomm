const Product = require("../models/productmodels")

const asyncHandler = require("../middleware/asyncerrorhandle")

const ApiFeatures = require("../utils/apifeatures")


// Create product --admin
// api/v1/product
// Post request

exports.createProduct = asyncHandler(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

// get prducts 
// api/v1/products
// POST request
//admin
exports.getAllProducts = asyncHandler(async (req, res,)=>{
     // Get the query parameters from the request
  const queryStr = req.query;

    // Create an instance of ApiFeatures with the Product query and query parameters
  const features = new ApiFeatures(Product.find(), queryStr).filter().search().sort().limitFields().paginate()
  // Execute the query
  const products = await features.query


  res.status(200).json({
    success: true,
    products
  })
})
// update product --admin
exports.updateProduct = asyncHandler(async(req, res, next)=>{
    
    let product = await Product.findById(req.params.id)

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {
        new:true,
        runValidators:true,
        useFindAndMOdify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})
// delete product
// Delete Request 
//admin
exports.deleteProduct = asyncHandler(async(req,res,next)=>{
    
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    
await Product.deleteOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  })


// Get product details
//admin

exports.getProduct = asyncHandler(async(req, res, next)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
        success:true,
        product
    })

 }) 
     
