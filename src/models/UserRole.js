const { Schema, model, Types } = require('mongoose'); 

const userRoleSchema = new Schema({ 
    user: {
        type: Types.ObjectId, 
        ref: 'User'
    }, 
    roles: [{
        type: Types.ObjectId, 
        ref: 'ApplicationRole' 
    }]
}); 

const UserRole = model('UserRole', userRoleSchema); 

module.exports = UserRole; 
