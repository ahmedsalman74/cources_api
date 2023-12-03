const express = require('express')

const Router = express.Router();

const usersController = require('../controllers/usersController');
const verifyToken =require('../middlewares/tokenCheck');

Router.route('/')
    .get(verifyToken,usersController.getAllUsers)
    


Router.route('/register')
    .post(usersController.register)


Router.route('/login')
    .post(usersController.login)
    



module.exports = Router;