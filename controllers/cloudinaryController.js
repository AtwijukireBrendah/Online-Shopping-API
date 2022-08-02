// //importing prisma
// const {PrismaClient} = require('@prisma/client');
// const { request } = require('express');
// //instance of prisma client
// const prisma = new PrismaClient();
// const cloudinary = require('cloudinary');

// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     secret_key:process.env.API_SECRET,}
// )

// // CLOUDIANRY CRUD
// //Route handler  and request handler
// const getAllImages = async(req,res)=>{
//     try{
//         const Products = await prisma.product.findMany({
//             // include:{author:true}
//         })
//         res.status(200).json(Products)
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }
// }

// const createImage = async(req,res)=>{
//     try{
//         // const {text,authorId} =req.body
//         const result = await cloudinary.uploader.upload(filepath)
//         const uploads = await prisma.upload.create({
//             data:{
//                 title:
//                 imageUrl:
//             }
//         })
//         res.status(200).json({message:"Product has been added successfully.",Product:newProduct})
//     }
//     catch(error){
//         res.status(500).json({error:error.message})
//     }
// }

// module.exports = {
//     getAllImages,
//     createImage
// }