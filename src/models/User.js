const { Schema, model } = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const { PASSWORD } = require('../constants/security');

const userSchema = new Schema({ 
    firstName: String, 
    lastName: String, 
    email: String, 
    photo: String, 
    description: String, 
    password: String, 
}); 

userSchema.pre('save', async function() { 
    this.password = await bcrypt.hash(this.password, PASSWORD.HASH_ROUNDS); 
}); 

userSchema.virtual('userName').get(function() { 
    return `${this.firstName} ${this.lastName}`; 
}); 

const User = model('User', userSchema); 

module.exports = User; 
