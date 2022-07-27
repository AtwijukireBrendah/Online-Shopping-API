//importing prisma
const {PrismaClient} = require('@prisma/client');
const { request } = require('express');
//instance of prisma client
const prisma = new PrismaClient();

// QUOTES CRUD
//Route handler  and request handler
const getAllQuotes = async(req,res)=>{
    try{
        const quotes = await prisma.quote.findMany({
            include:{author:true}
        })
        res.status(200).json(quotes)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const createQuote = async(req,res)=>{
    try{
        const {text,authorId} =req.body
        const newQuote = await prisma.quote.create({
            data:{text,authorId}
        })
        res.status(200).json({message:"Quote has been added successfully.",quote:newQuote})
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const getQuoteById = async(req,res)=>{
    try{
        const id =req.params.id
        if(id){
            const quote = await prisma.quote.findUnique({
                where:{
                    id:Number(id)
                },
                include:{author:true}
            })
            res.status(200).json(quote)
        }else{
            res.status(404).json(`Quote with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const updateQuoteById = async(req,res)=>{
    try{
        const id =req.params.id
        const quote= await prisma.quote.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
        if(quote){   
            res.status(200).json({message:"Quote has been updated.",quote})
        }else{
            res.status(404).json(`Quote with id ${id} not found`)
        }   
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const deleteQuoteById = async(req,res)=>{
    try{
        const id =req.params.id
        const quote = await prisma.quote.delete({
            where:{
                id:Number(id)
            },
            include:{author:true}
        })
        if(quote){   
            res.status(200).json({message:"Quote has been deleted."})
        }else{
            res.status(404).json(`Quote with id ${id} not found`)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = {
    getAllQuotes,
    createQuote,
    getQuoteById,
    updateQuoteById,
    deleteQuoteById
}