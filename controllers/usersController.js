let User = require('../models/users.model');
const ascyncWatpper = require('../middlewares/ascyncWarpper');
const AppError = require('../utilites/appErrors');
const generatJWT=require('../utilites/JWTgenerate');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const getAllUsers = async (req, res) => {
    
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const Users = await User.find({}, { "__v": false, "Password": false }).limit(limit).skip(skip);


    res.json({ status: "success", data: { User: Users } })

}
const register = ascyncWatpper(
    async (req, res, next) => {

        const { firstName, lastName, email,role, password } = req.body;
        const olduser = await User.findOne({ email: email })
        if (olduser) {
            const error = AppError.create('user alaredy exist', 400, "Error")
            return next(error)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
            avatar: req.file.filename
        })
       

        var token =await generatJWT({ email: newUser.email,id:newUser._id ,role:newUser.role});
        newUser.token = token;
        await newUser.save();
        res.status(201).json({ status: "success", data: { user: newUser } });
    })

const login = ascyncWatpper(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email && !password) {
            const error = AppError.create('Email or Password is reqired', 400, "Error")
            return next(error)
        }
        const user=await User.findOne({email:email});
        if (!user){
            const error = AppError.create('Email dosnot exist', 400, "Error")
            return next(error)
        }
         const matchedPassword = await bcrypt.compare(password, user.password);
       

        if(matchedPassword){
            const token =await generatJWT({ email: user.email,id:user._id , role: user.role });
            res.status(200).json({ status: "success", user: "user login successfully",data:{token} });
        }
        else{
            const error = AppError.create(' Password is wrong', 400, "Error")
            return next(error)
        }


    }
)

module.exports = {
    getAllUsers,
    register,
    login
}