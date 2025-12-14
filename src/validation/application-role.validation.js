const validator = require('express-validator'); 
const ERROR_MESSAGES = require('../constants/error.messages'); 

const runValidations = () => { 
    return [
        validator.body('name') 
            .trim() 
            .not().isEmpty() 
            .withMessage(ERROR_MESSAGES.REQUIRED('name')), 
        validator.body('description') 
            .trim() 
            .not().isEmpty() 
            .withMessage(ERROR_MESSAGES.REQUIRED('description')) 
    ]; 
}; 

const getValidationResult = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = {
    runValidations, 
    getValidationResult 
}; 
