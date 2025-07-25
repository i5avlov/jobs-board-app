const User = require('../models/User'); 

module.exports = {
    getProfileByEmail: (email) => { 
        return User.findOne({ email: email }); 

    }, 

    getProfileForEditByEmail: (email) => { 
        return User.findOne({ email: email }).select('username photo description'); 

    }, 

    update: (email, updateData) => { 
        const { username, photo, description } = updateData; 

        return User.findOneAndUpdate({ email: email }, { 
            username: username, 
            photo: photo, 
            description: description 
        }); 

    }
}; 
