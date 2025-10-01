const validator = require('express-validator'); 

const runValidations = () => { 
    return [
        validator.body('email')
            .isEmail(), 
        validator.body('password') 
            .isLength({ min: 4 })
    ]; 
}; 

const getValidationResult = (req) => { 
    return validator.validationResult(req); 
}; 

module.exports = {
    runValidations, 
    getValidationResult 
}; 
