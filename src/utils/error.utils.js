const mongoose = require('mongoose'); 
const ValidationError = require('../errors/ValidationError');

module.exports = { 
    normalize: (error) => { 
        let errors = []; 

        if (error instanceof mongoose.Error.ValidationError) { 
            Object.keys(error.errors).map(k => {
                errors[k] = { message: error.errors[k].message }; 
            }); 

            return errors; 
        } 

        if (error instanceof ValidationError) { 
            errors[error.path] = { message: error.message }; 

            return errors; 
        }

    }

}; 
