const { Schema, model, Types } = require('mongoose'); 

const companyRepresentativeSchema = new Schema({ 
    user: {
        type: Types.ObjectId, 
        ref: 'User'
    }, 
    company: {
        type: Types.ObjectId, 
        ref: 'Company'
    }
    
}); 

const CompanyRepresentative = model('CompanyRepresentative', companyRepresentativeSchema); 

module.exports = CompanyRepresentative; 
