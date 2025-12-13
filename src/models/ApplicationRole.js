const { Schema, model } = require('mongoose'); 

const applicationRoleSchema = new Schema({ 
    name: String, 
    description: String, 
    createdAt: Date, 
    updatedAt: Date 
}); 

const ApplicationRole = model('ApplicationRole', applicationRoleSchema); 

module.exports = ApplicationRole; 
