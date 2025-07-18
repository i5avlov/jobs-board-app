const handlebars = require('express-handlebars'); 
const { HBS } = require('../constants/config');

module.exports = { 
    config: (app) => { 
        app.engine(HBS.EXT, handlebars.engine({ extname: HBS.EXT })); 
        app.set('view engine', HBS.EXT); 
        app.set('views', HBS.VIEWS_DIRECTORY); 
    } 
}; 
