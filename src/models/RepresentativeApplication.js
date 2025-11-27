const { Schema, model, Types } = require('mongoose'); 

const representativeApplicationSchema = new Schema({ 
    user: {
        type: Types.ObjectId, 
        ref: 'User'
    }, 
    company: {
        type: Types.ObjectId, 
        ref: 'Company'
    }, 
    isAccepted: Boolean,  
    isRejected: Boolean, 
    addedAt: Date, 
    processedAt: Date 
    
}); 

const RepresentativeApplication = model('RepresentativeApplication', representativeApplicationSchema); 

module.exports = RepresentativeApplication; 
