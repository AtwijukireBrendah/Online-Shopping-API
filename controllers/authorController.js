//importing prisma
const {PrismaClient} = require('@prisma/client');
const { message } = require('../helpers/joi-schemas');
//instance of prisma client
const prisma = new PrismaClient();


// AUTHOR CRUD
//Route handler  and request handler
const getAllAuthors = async(req,res)=>{
    try{
        const authors = await prisma.author.findMany({
            include:{quotes:true}
        })
        res.status(200).json({message:"Authors have been found.",author:authors})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const createAuthor = async(req,res)=>{
    try{
        const {id,name} =req.body
        const newAuthor = await prisma.author.create({
            data:{id,name}
        })
        res.status(200).json({message:"Author has been added successfully.",author:newAuthor})
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

const getAuthorById = async(req,res)=>{
    try{
        const id =req.params.id
        if(id){
            const author = await prisma.author.findUnique({
                where:{
                    id:Number(id)
                },
                include:{quotes:true}
            })
            res.status(200).json(author)
        }else{
            res.status(404).json(`Quote with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateAuthorById = async(req,res)=>{
    try{
        const id =req.params.id
        const author= await prisma.author.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
        if(author){   
            res.status(200).json({message:"Author has been updated.",author})
        }else{
            res.status(404).json(`Author with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteAuthorById = async(req,res)=>{
    try{
        const id =req.params.id
        const author = await prisma.author.delete({
            where:{
                id:Number(id)
            },
            // include:{author:true}
        })
        if(author){   
            res.status(200).json({message:"Author has been deleted."})
        }else{
            res.status(404).json(`Author with id ${id} not found`)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }

}

module.exports = {
    getAllAuthors,
    createAuthor,
    getAuthorById,
    updateAuthorById,
    deleteAuthorById,
}