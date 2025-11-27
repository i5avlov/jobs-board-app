const { Schema, model, Types } = require('mongoose'); 

const adSchema = new Schema({ 
    title: String, 
    description: String, 
    createdBy: {
        type: Types.ObjectId, 
        ref: 'CompanyRepresentative' 
    }, 
    createdAt: Date, 
    updatedAt: Date 
}); 

const Ad = model('Ad', adSchema); 

module.exports = Ad; 
