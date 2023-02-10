const jwt = require('jsonwebtoken');
const { UnathenticatedError } = require('../error');

const authorizationMiddleware = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnathenticatedError('No Token Provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.SECRECT_KEY);
        const { id,username } = decoded;
        req.user = { id,username }
        next()
    } catch (error) {
        throw new UnathenticatedError('No authrized to access this route');
    }
}
module.exports = authorizationMiddleware;