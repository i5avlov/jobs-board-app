const { Schema, model } = require('mongoose'); 

const adSchema = new Schema({ 
    title: String, 
    description: String, 
}); 

const Ad = model('Ad', adSchema); 

module.exports = Ad; 