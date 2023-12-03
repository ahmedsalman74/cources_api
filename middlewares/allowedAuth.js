const AppError=require("../utilites/appErrors")
module.exports = (...roles) => {
  
   
    return (req, res, next) => {
       
    
        if (!roles.includes(req.currentUser.role)) {

            const error = AppError.create('this role is not authorized ', 401, "Error")
            return next(error)
        }
        next();

    }

}