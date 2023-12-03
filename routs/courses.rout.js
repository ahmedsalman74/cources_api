const express = require('express')

const Router = express.Router();

const coursesController = require('../controllers/coursesController');
const { validationSchema } = require('../middlewares/validator');
const verifyToken = require('../middlewares/tokenCheck');
const allowedAute = require('../middlewares/allowedAuth');
const userRoles = require('../utilites/userRols');

Router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken,allowedAute(userRoles.MANAGER),validationSchema(), coursesController.AddCourse)


Router.route('/:courseid')
    .get(verifyToken,coursesController.getCourse)
    .patch(verifyToken,coursesController.UpdateCourse)
    .delete(verifyToken,allowedAute(userRoles.ADMIN,userRoles.MANAGER),coursesController.deleteCourse);



module.exports = Router;