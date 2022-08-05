const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
//instance of prisma client
const prisma = new PrismaClient();
const multer  = require('multer')
const {unlink} = require('fs');
const cloudinary = require('cloudinary');

//import Product schema
const ProductSchema =require('../helpers/joi-schemas');
const validateData = require('../helpers/validation');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = multer.diskStorage({})

const upload = multer({ storage: storage }); 

//Import Controllers
const {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    } = require('../controllers/productController');

const authenticate = require('../helpers/authenticate');

router.get("/",getAllProducts);

// router.post("/",[authenticate,upload.single('productImage'),validateData(ProductSchema)], createProduct);
router.post("/",upload.single("image",validateData(ProductSchema),async(req,res)=>{
    try{
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        const newProduct = await prisma.Product.create({
            data: {
                name: req.body.name,
                categoryId: req.body.categoryId,
                image: result.url,
                price: req.body.price,
                description: req.body.description,
                numberInStock: req.body.numberInStock
            }
        })
        // delete file from uploads folder
        // unlink(req.file.path,(err)=>{
        //     if(err) return res.json('failed to delete file');
        // });
        res.status(200).json({message:"Product has been added successfully.",Product:newProduct})
    }
    catch(error){
        res.status(400).json(error.message)
    }
}))

router.get("/:id",getProductById);

router.patch("/:id",updateProductById);

router.delete("/:id",deleteProductById);


module.exports = router;
