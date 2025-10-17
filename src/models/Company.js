const { Schema, model, Types, deleteModel } = require('mongoose'); 

const companySchema = new Schema({ 
    name: String, 
    description: String, 
    imageUrl: String, 
    addedAt: Date, 
    modifiedAt: Date, 
    addedBy: {
        type: Types.ObjectId, 
        ref: 'User' 
    }, 
}); 

const Company = model('Company', companySchema); 

module.exports = Company; 
