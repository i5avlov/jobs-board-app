const { Schema, model } = require('mongoose'); 

const adSchema = new Schema({ 
    title: { 
        type: String, 
        required: [true, 'Title is required'] 
    }, 
    description: { 
        type: String, 
        required: [true, ''] 
    }, 
}); 

const Ad = model('Ad', adSchema); 

module.exports = Ad; 