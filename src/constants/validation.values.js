const VALIDATION_VALUES = { 
    USERNAME: { 
        MIN_LENGTH: 6 
    }, 
    EMAIL: { 
        REGEX: /[]/ 
    }, 
    PASSWORD: { 
        MIN_LENGTH: 6, 
        MAX_LENGTH: 20 
    } 
}; 

module.exports = VALIDATION_VALUES; 
