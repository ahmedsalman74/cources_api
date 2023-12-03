let Course = require('../models/course.model');
const ascyncWatpper = require('../middlewares/ascyncWarpper');
const { validationResult } = require('express-validator')
const AppError = require('../utilites/appErrors')


const getAllCourses = async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip);


    res.json({ status: "success", data: { courses: courses } })

}
const getCourse = ascyncWatpper(
    async (req, res, next) => {
        const course = await Course.findById(req.params.courseid)

        if (!course) {
            const error = AppError.create('course not found', 404, "fail")
            return next(error)

        }
        return res.json({ status: "success", data: { course: course } })


    })

const AddCourse = ascyncWatpper(
    async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const error = AppError.create(errors.array(), 400, "Error")
            return next(error)
            // return res.status(400).json({status : "Error", data: {errors:errors.array()}});
        }
        const newCourse = new Course(req.body);
        await newCourse.save();

        res.status(201).json({ status: "success", data: { course: newCourse } });
    })

const UpdateCourse = ascyncWatpper(
    async (req, res, next) => {
        const courseID = req.params.courseid;

        const UpdateCourse = await Course.findByIdAndUpdate(courseID, { $set: { ...req.body } })
        const course = await Course.findById(courseID)
        return res.status(200).json({ status: "success", data: { course } })

    })

const deleteCourse = ascyncWatpper( async (req, res) => {
    
        const result = await Course.deleteOne({ _id: req.params.courseid });
        res.status(200).json({ status: "success", dat: null });
   
    
})

module.exports = {
    getAllCourses,
    getCourse,
    AddCourse,
    UpdateCourse,
    deleteCourse
}