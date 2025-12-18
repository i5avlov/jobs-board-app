const User = require('../models/User'); 

module.exports = { 
    // ['name', 'email', 'age'...] 
    getAll: (projectionKeysArray) => { 
        const projectionObject = projectionKeysArray
            .reduce((obj, currentKey) => { 
                obj[currentKey] = true; 
                return obj; 
            }, {}); 

        return User 
            .find({}) 
            .select(projectionObject) 
            .lean(); 
    }, 

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
