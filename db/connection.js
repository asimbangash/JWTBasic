const mongoose = require('mongoose');


const connectDB = async(uri)=>{
    try {
        mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}
mongoose.set('strictQuery', true);
module.exports = connectDB;