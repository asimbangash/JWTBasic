require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connection');
const mainRouter = require('./router/main');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 5000;

// app.get("/", (req,res)=>{
//     res.json({msg: "hellooooo"});
// });

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1',mainRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT,()=>{
            console.log(`server running port NO ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();