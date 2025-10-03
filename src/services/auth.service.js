const { JWT } = require('../constants/security');
const ValidationError = require('../errors/ValidationError');
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

module.exports = {
    register: async (registerData) => { 
        const { firstName, lastName, email, photo, description, password, repeatPassword } = registerData; 

        // Error if email is already used  
        const existingUser = await User.findOne({ email: email }); 
        if (existingUser) { 
            throw new ValidationError('email', `User with email ${email} exists`); 
        } 

        // Creating user model 
        const user = new User({
            firstName: firstName, 
            lastName: lastName, 
            email: email, 
            photo: photo, 
            description: description, 
            password: password 
        });  

        // Validating user data before saving to catch entered data errors 
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
        email: user.email, 
        photo: user.photo  
    }; 

    const token = jwt.sign(JSON.stringify(payload), JWT.SECRET); 

    return token; 
}
