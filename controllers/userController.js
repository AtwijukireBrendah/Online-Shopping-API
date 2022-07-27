
//importing prisma
const {PrismaClient} = require('@prisma/client');
const { StatusCodes } = require ('http-status-codes');
const { request } = require('express');
//instance of prisma client
const prisma = new PrismaClient();
//importing JWT
const JWT = require('jsonwebtoken');


// USERS CRUD
//Route handler  and request handler
const getAllUsers = async(req,res)=>{
    try{
        const users = await prisma.user.findMany({
            // include:{password:true}
        })
        res.status(StatusCodes.OK).json(users)
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}


const createUser = async(req,res)=>{
    try{
        // const {username,password} =req.body
        const newUser = await prisma.user.create({
            data:req.body
        })

        console.log(req.body)

        //creating JWT token
        const token =JWT.sign({username:req.body.username,userId:newUser.id},"open123");
        // res.header('x-auth-token',token).status(200).send('User created successfully');
        console.log(token)
        res.status(StatusCodes.OK).json({message:"New user has been created successfully",newUser,token})
    
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message})
    }
}


module.exports = {getAllUsers,createUser}

 