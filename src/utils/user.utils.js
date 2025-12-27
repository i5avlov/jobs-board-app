const jwt = require('jsonwebtoken'); 
const { JWT } = require('../constants/security'); 
const userRolesService = require('../services/user-roles.service');

const generateAuthToken = async (user) => {
    const userRoles = await userRolesService.getUserRoles(user._id); 

    const payload = { 
        id: user._id, 
        userName: user.userName, 
        email: user.email, 
        photo: user.photo, 
        roles: userRoles   
    }; 

    const token = jwt.sign(JSON.stringify(payload), JWT.SECRET); 

    return token; 
}; 

module.exports = {
    generateAuthToken, 
}; 
