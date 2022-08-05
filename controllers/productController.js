//importing prisma
const {PrismaClient} = require('@prisma/client');
const { request } = require('express');
//instance of prisma client
const prisma = new PrismaClient();
const multer  = require('multer')
const {unlink} = require('fs');
const cloudinary = require('cloudinary');
const upload = multer({ dest: 'uploads/' });


// PRODUCTS CRUD
//Route handler  and request handler
const getAllProducts = async(req,res)=>{
    try{
        const Products = await prisma.product.findMany({
        })
        res.status(200).json(Products)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const createProduct = async(req,res)=>{
    try{
        const newProduct = await prisma.Product.create({
            data: {
                name: req.body.name,
                categoryId: req.body.categoryId,
                image: req.body.image,
                price: req.body.price,
                description: req.body.description,
                numberInStock: req.body.numberInStock
            }
        })
        res.status(200).json({message:"Product has been added successfully.",Product:newProduct})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
const getProductById = async(req,res)=>{
    try{
        const id =req.params.id
        if(id){
            const Product = await prisma.Product.findUnique({
                where:{
                    id:Number(id)
                },
            })
            res.status(200).json(Product)
        }else{
            res.status(404).json(`Product with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateProductById = async(req,res)=>{
    try{
        const id =req.params.id
        const Product= await prisma.Product.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
        if(Product){   
            res.status(200).json({message:"Product has been updated.",Product})
        }else{
            res.status(404).json(`Product with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteProductById = async(req,res)=>{
    try{
        const id =req.params.id
        const Product = await prisma.Product.delete({
            where:{
                id:Number(id)
            },
        })
        if(Product){   
            res.status(200).json({message:"Product has been deleted."})
        }else{
            res.status(404).json(`Product with id ${id} not found`)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
}