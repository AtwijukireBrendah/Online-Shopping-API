const express=require('express');
const app = express();
const cors = require('cors');

//routers
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
// const cloudinaryRouter = require('./routes/cloudinaryRouter');

//Middleware
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({extended:true}))

//Route Handlers
app.get('/api/v1/', (req, res)=>{
    res.status(200).json({
        status:200, 
        message:"Online-Shopping API working fine"
    })
});
app.use("/api/v1/products",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter);
// app.use("/api/v1/cloudinary",cloudinaryRouter);

module.exports = app;