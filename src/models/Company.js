const { Schema, model, Types } = require('mongoose'); 

const companySchema = new Schema({ 
    name: String, 
    description: String, 
    image: String, 
    createdBy: {
        type: Types.ObjectId, 
        ref: 'User' 
    }
}); 

const Company = model('Company', companySchema); 

module.exports = Company; 
