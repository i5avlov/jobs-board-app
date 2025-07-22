const { JWT } = require('../constants/security');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

module.exports = {
    register: async (registerData) => { 
        const { username, email, password, repeatPassword } = registerData; 

        // Error if email is already used  
        const existingUser = await User.findOne({ email: email }); 
        if (existingUser) { 
            throw new ValidationError('email', `User with email ${email} exists`); 
        } 

        // Creating user 
        const user = new User({
            username: username, 
            email: email, 
            password: password 
        });  

        // Validating user before saving to catch entered data errors 
        await user.validate();

        // Passwords are compared last 
        if (password !== repeatPassword) { 
            throw new ValidationError('passwords', 'Passwords do not match'); 
        } 

        await user.save(); 

        const authToken = generateAuthToken(user); 

        return authToken; 
    }, 

    login: async (loginData) => { 
        const { email, password } = loginData; 

        // Error if there is no user with provided email 
        const user = await User.findOne({ email: email }); 
        if (!user) { 
            throw new ValidationError('email', 'User does not exist'); 
        } 

        // Error if password do not match user password s
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (false === isPasswordValid) { 
            throw new ValidationError('password', 'Password incorrect'); 
        } 

        const authToken = generateAuthToken(user); 

        return authToken; 
    }, 

}; 

function generateAuthToken(user) { 
    const payload = {
        username: user.username, 
        email: user.email  
    }; 

    const token = jwt.sign(payload, JWT.SECRET); 

    return token; 
}
