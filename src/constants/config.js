module.exports = { 
    SERVER: {
        PORT: 4000, 
        PUBLIC_DIRECTORY: 'src/public', 
        MESSAGES: {
            SUCCESS: 'Server listening...' 
        }
    }, 
    HBS: { 
        EXT: 'hbs', 
        VIEWS_DIRECTORY: 'src/views' 
    }, 
    DB: {
        URL: 'mongodb://localhost:27017', 
        NAME: 'jobs_board_app', 
        MESSAGES: {
            SUCCESS: 'Connected to DB.', 
            ERROR: 'Error connecting to DB'  
        }
    }

}; 
