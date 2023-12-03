const mongoose= require('mongoose');
const validator= require('validator');
const userRoles = require('../utilites/userRols');
const usersSchema=new mongoose.Schema({
firstName:{
    type: String,
    required: true
},
lastName:{
    type: String,
    required: true
},
email:{
type:String,
required: true,
validate:[validator.isEmail,'field must be a valid email']
},
password:{
type:String,
required: true
},
token:{
type:String,
required: true
},
role:{
type:String,
enum:[userRoles.ADMIN, userRoles.USER,userRoles.MANAGER],
default:userRoles.USER
},
avatar:{
type:String,
default:'uploads/avatar1.png'
}




});
module.exports=mongoose.model('User',usersSchema);