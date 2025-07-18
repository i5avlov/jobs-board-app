const User = require('../models/User'); 

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

}; 
