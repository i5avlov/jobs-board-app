const handlebars = require('express-handlebars'); 
const { TEMPLATE_ENGINE } = require('../constants/config');

module.exports = { 
    config: (app) => { 
        app.engine(TEMPLATE_ENGINE.EXT, handlebars.engine({ extname: TEMPLATE_ENGINE.EXT })); 
        app.set('view engine', TEMPLATE_ENGINE.EXT); 
        app.set('views', TEMPLATE_ENGINE.VIEWS_DIRECTORY); 
    } 
}; 
