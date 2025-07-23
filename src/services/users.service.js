const User = require('../models/User'); 

module.exports = {
    getProfileByEmail: (email) => { 
        return User.findOne({ email: email }); 

    }, 
}; 
