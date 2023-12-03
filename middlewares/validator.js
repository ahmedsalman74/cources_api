const { body } = require('express-validator')


const validationSchema=()=>{

    return[
        body('name').notEmpty()
            .withMessage('title is required')
            .isLength({ min: 2 })
            .withMessage('titel min length is 2 char'),


        body('price').notEmpty()
            .withMessage('price is required')

    ]
    
}
module.exports={
    validationSchema 
}