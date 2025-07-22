const express = require('express'); 
const { SERVER } = require('../constants/config'); 
const cookieParser = require('cookie-parser'); 
const authMiddleware = require('../middlewares/auth.middleware'); 

module.exports = { 
    config: (app) => { 
        app.use(express.static(SERVER.PUBLIC_DIRECTORY)); 
        app.use(cookieParser()); 
        app.use(authMiddleware.auth()); 
        app.use(express.urlencoded()); 
    } 
}; 
