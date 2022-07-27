const express=require('express');
const app = express();
const cors = require('cors');

//routers
const quoteRouter = require('./routes/quoteRouter');
const authorRouter = require('./routes/authorRouter');
const userRouter = require('./routes/userRouter');

//Middleware
app.use(express.json());
app.use(cors());

//Route Handlers
app.use("/api/v1/quotes",quoteRouter);
app.use("/api/v1/authors",authorRouter);
app.use("/api/v1/users",userRouter);

module.exports = app;