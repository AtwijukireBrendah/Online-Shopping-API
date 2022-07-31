//importing prisma
const {PrismaClient} = require('@prisma/client');
const { request } = require('express');
//instance of prisma client
const prisma = new PrismaClient();

// CATEGORY CRUD
//Route handler  and request handler
const getAllCategories = async(req,res)=>{
    try{
        const Categories = await prisma.category.findMany({
            // include:{author:true}
        })
        res.status(200).json(Categories)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const createCategory = async(req,res)=>{
    try{
        // const {text,authorId} =req.body
        const newCategory = await prisma.Category.create({
            // data:{text,authorId}
        })
        res.status(200).json({message:"Category has been added successfully.",Category:newCategory})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getCategoryById = async(req,res)=>{
    try{
        const id =req.params.id
        if(id){
            const Category = await prisma.Category.findUnique({
                where:{
                    id:Number(id)
                },
                // include:{author:true}
            })
            res.status(200).json(Category)
        }else{
            res.status(404).json(`Category with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateCategoryById = async(req,res)=>{
    try{
        const id =req.params.id
        const Category= await prisma.Category.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
        if(Category){   
            res.status(200).json({message:"Category has been updated.",Category})
        }else{
            res.status(404).json(`Category with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteCategoryById = async(req,res)=>{
    try{
        const id =req.params.id
        const Category = await prisma.Category.delete({
            where:{
                id:Number(id)
            },
            // include:{author:true}
        })
        if(Category){   
            res.status(200).json({message:"Category has been deleted."})
        }else{
            res.status(404).json(`Category with id ${id} not found`)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}