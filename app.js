const express=require('express');
const app = express();
const cors = require('cors');

//routers
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');

//Middleware
app.use(express.json());
app.use(cors());

//Route Handlers
app.use("/api/v1/products",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter);

module.exports = app;