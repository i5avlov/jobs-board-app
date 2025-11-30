const { Schema, model, Types } = require('mongoose'); 

const adApplicationSchema = new Schema({ 
    user: {
        type: Types.ObjectId, 
        ref: 'User'
    }, 
    ad: {
        type: Types.ObjectId, 
        ref: 'Ad'
    }, 
    addedAt: Date, 
    
}); 

const AdApplication = model('AdApplication', adApplicationSchema); 

module.exports = AdApplication; 
