const jwt = require('jsonwebtoken'); 
const { JWT } = require('../constants/security'); 

const generateAuthToken = (user) => { 
    const payload = { 
        id: user._id, 
        userName: user.userName, 
        email: user.email, 
        photo: user.photo  
    }; 

    const token = jwt.sign(JSON.stringify(payload), JWT.SECRET); 

    return token; 
}; 

module.exports = {
    generateAuthToken, 
}; 
