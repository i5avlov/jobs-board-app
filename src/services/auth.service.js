const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 

module.exports = {
    register: async (registerData) => { 
        const { username, email, password, repeatPassword } = registerData; 

        // Error if email is already used  
        const existingUser = await User.findOne({ email: email }); 
        if (existingUser) { 
            throw new Error(`User with email ${email} exists`); 
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
            throw new Error('Passwords do not match'); 
        } 

        return user.save(); 
    }, 

    login: async (loginData) => { 
        const { email, password } = loginData; 

        // Error if there is no user with provided email 
        const user = await User.findOne({ email: email }); 
        if (!user) { 
            throw new Error('User does not exist'); 
        } 

        // Error if password do not match user password s
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (false === isPasswordValid) { 
            throw new Error('Password incorrect'); 
        } 

        return user; 
    }, 

}; 
