const express = require('express'); 
const { SERVER } = require('../constants/config'); 
const cookieParser = require('cookie-parser'); 

module.exports = { 
    config: (app) => { 
        app.use(express.static(SERVER.PUBLIC_DIRECTORY)); 
        app.use(cookieParser()); 
        app.use(express.urlencoded()); 
    } 
}; 
