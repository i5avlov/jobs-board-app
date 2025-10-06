const LOGIN_FAILED = 'Email or password not correct'; 

const ERROR_MESSAGES = { 
        
    REQUIRED: (field) => `${capitalize(field)} is required`, 
    MIN_LENGTH: (field, value) => `${capitalize(field)} has to be minimum ${value} characters long`, 
    MAX_LENGTH: (field, value) => `${capitalize(field)} has to be maximum ${value} characters long`, 

    LOGIN: { 
        NO_USER_WITH_EMAIL: 'No user with such email', 
        PASSWORD_NOT_CORRECT: 'Password not valid'  
    }, 

    EMAIL: { 
        NOT_AN_EMAIL: 'The email is not valid' 
    }, 

    PASSWORD: {
        NO_LOWERCASE_CHAR: '', 
        NO_UPPERCASE_CHAR: '', 
        NO_DIGIT: '' 
    }
}; 

module.exports = ERROR_MESSAGES; 

function capitalize(str = '') { 
    return str.charAt(0).toUpperCase() + str.slice(1); 
}
