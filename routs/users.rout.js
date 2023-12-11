const express = require('express')

const Router = express.Router();
const multer = require('multer')
const appError=require('../utilites/appErrors')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = `${Date.now()}.${ext}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(appError.create('file must be an image', 400), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter
})
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/tokenCheck');

Router.route('/')
    .get(verifyToken, usersController.getAllUsers)



Router.route('/register')
    .post(upload.single('avatar'), usersController.register)


Router.route('/login')
    .post(usersController.login)




module.exports = Router;