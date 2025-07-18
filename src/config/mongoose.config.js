const mongoose = require('mongoose'); 
const { DB } = require('../constants/config');

module.exports = { 
    config: () => { 
        mongoose
            .connect(DB.URL, { dbName: DB.NAME }) 
            .then(() => console.log(DB.MESSAGES.SUCCESS)) 
            .catch((err) => console.log(DB.MESSAGES.ERROR, err.message));  
    }
}; 
