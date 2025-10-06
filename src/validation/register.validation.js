const validator = require('express-validator'); 
const ERROR_MESSAGES = require('../constants/error.messages'); 
const { PASSWORD } = require('../constants/validation.values');

const runValidations = () => { 
    return [
        validator.body('email') 
            .trim() 
            .isEmail() 
            .withMessage(ERROR_MESSAGES.EMAIL.NOT_AN_EMAIL), 
        validator.body('password') 
            .trim() 
            .isLength({ min: PASSWORD.MIN_LENGTH }) 
            .withMessage(ERROR_MESSAGES.MIN_LENGTH('password', PASSWORD.MIN_LENGTH)) 
    ]; 
}; 

const getValidationResult = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = {
    runValidations, 
    getValidationResult 
}; 
