const User = require('../models/User'); 

module.exports = {
    getProfileByEmail: (email) => { 
        return User.findOne({ email: email }); 

    }, 

    getProfileForEditByEmail: (email) => { 
        return User.findOne({ email: email }).select('username photo'); 

    }, 

    update: (email, updateData) => { 
        const { username, photo } = updateData; 

        return User.findOneAndUpdate({ email: email }, { 
            username: username, 
            photo: photo 
        }); 

    }
}; 
