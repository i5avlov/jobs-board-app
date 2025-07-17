const mongoose = require('mongoose'); 

module.exports = { 
    config: () => { 
        mongoose
            .connect('mongodb://localhost:27017', { dbName: 'jobs_board_app' }) 
            .then(() => console.log('Connected to DB.')) 
            .catch((err) => console.log('Error connecting to DB:', err.message));  
    }
}; 
