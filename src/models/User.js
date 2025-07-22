const { Schema, model } = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const { PASSWORD } = require('../constants/security');

const userSchema = new Schema({ 
    username: { 
        type: String, 
        required: [true, 'Username is required'] 
    }, 
    email: {
        type: String, 
        required: [true, 'Email is required']
    }, 
    photo: { 
        type: String 
    }, 
    password: {
        type: String, 
        required: [true, 'Password is required'] 
    } 
}); 

userSchema.pre('save', async function() { 
    this.password = await bcrypt.hash(this.password, PASSWORD.HASH_ROUNDS); 
}); 

const User = model('User', userSchema); 

module.exports = User; 
