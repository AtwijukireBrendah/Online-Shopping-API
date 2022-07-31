//importing prisma
const {PrismaClient} = require('@prisma/client');
const { request } = require('express');
//instance of prisma client
const prisma = new PrismaClient();

// PRODUCTS CRUD
//Route handler  and request handler
const getAllProducts = async(req,res)=>{
    try{
        const Products = await prisma.product.findMany({
            // include:{author:true}
        })
        res.status(200).json(Products)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const createProduct = async(req,res)=>{
    try{
        // const {text,authorId} =req.body
        const newProduct = await prisma.Product.create({
            // data:{text,authorId}
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
                // include:{author:true}
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
            // include:{author:true}
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
    deleteProductById
}