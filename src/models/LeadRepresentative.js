const { Schema, model, Types } = require('mongoose'); 

const leadRepresentativeSchema = new Schema({ 
    companyRepresentative: {
        type: Types.ObjectId, 
        ref: 'CompanyRepresentative'
    }, 
    
}); 

const LeadRepresentative = model('LeadRepresentative', leadRepresentativeSchema); 

module.exports = LeadRepresentative; 
