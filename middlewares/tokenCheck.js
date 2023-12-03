const JWT = require('jsonwebtoken')
const AppError = require('../utilites/appErrors');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {

        const error = AppError.create('token is required ', 401, "Error")
        return next(error)

    }
    const token = authHeader.split(' ')[1];
    try {
        const currentUser = JWT.verify(token, process.env.JWT_SECRET)
        req.currentUser = currentUser;
        
        next();
    } catch (err) {
        const error = AppError.create('invalid token', 401, "Error")
        return next(error)
    }
}
module.exports = verifyToken;