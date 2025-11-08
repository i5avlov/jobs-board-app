const { Schema, model, Types } = require('mongoose'); 

const jobSeekerSchema = new Schema({ 
    user: {
        type: Types.ObjectId, 
        ref: 'User'
    } 
    
}); 

const JobSeeker = model('JobSeeker', jobSeekerSchema); 

module.exports = JobSeeker; 
