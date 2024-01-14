const rateLimit = require("express-rate-limit");
// Rate limiter for login
const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    message: "Too many login attempts, please try again later.",
});

// Rate limiter for register
const registerRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour
    message: "Too many registration attempts, please try again later.",
});

// Rate limiter for add course
const addCourseRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 10, // 10 requests per day
    message: "Too many requests to add courses, please try again later.",
});

// Rate limiter for delete course
const deleteCourseRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 5, // 5 requests per day
    message: "Too many requests to delete courses, please try again later.",
});

module.exports = {
    loginRateLimiter,
    registerRateLimiter,
    addCourseRateLimiter,
    deleteCourseRateLimiter,
};
