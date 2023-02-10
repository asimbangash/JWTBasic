const jwt = require('jsonwebtoken');
const { BadRequestError } = require("../error");
const { StatusCodes } = require('http-status-codes');

const login = async(req,res)=>{
    const { password, username } = req.body;
    if(!password || !username){
        throw new BadRequestError('please provide Email and Password'); 
    }
    const id = new Date().getDate();
    const token = jwt.sign({id, username},process.env.SECRECT_KEY,{expiresIn:'2d'});
    res.status(StatusCodes.OK).json({msg: 'user created', token });
}

const dashboard = async(req,res)=>{
    const luckyNumber = Math.floor(Math.random()*50);
    res.status(StatusCodes.OK).json({msg:`hello ${req.user.username}`,secret:`your are authorized, your lucky number is ${luckyNumber}`});
}

module.exports = {login,dashboard};