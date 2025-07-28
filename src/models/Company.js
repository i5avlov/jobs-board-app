const { Schema, model, Types } = require('mongoose'); 

const companySchema = new Schema({ 
    name: { 
        type: String, 
        required: [true, ''] 
    }, 
    description: { 
        type: String, 
        required: [true, ''] 
    }, 
    image: { 
        type: String, 
        required: [true, ''] 
    }, 
    createdBy: {
        type: Types.ObjectId, 
        ref: 'User' 
    }
}); 

const Company = model('Company', companySchema); 

module.exports = Company; 
