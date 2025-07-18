const express = require('express'); 
const { SERVER } = require('../constants/config');

module.exports = { 
    config: (app) => { 
        app.use(express.static(SERVER.PUBLIC_DIRECTORY)); 
        app.use(express.urlencoded()); 
    } 
}; 
