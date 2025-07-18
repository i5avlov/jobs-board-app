const express = require('express'); 
const expr = require('./config/express.config');
const hbrs = require('./config/handlebars.config');
const mngs = require('./config/mongoose.config');
const routes = require('./routes');
const { SERVER } = require('./constants/config');

// App 
const app = express(); 

// Consfigurations 
expr.config(app); 
hbrs.config(app); 
mngs.config(); 

// Routes 
app.use(routes); 

// Server start 
app.listen(SERVER.PORT, () => console.log(SERVER.MESSAGES.SUCCESS)); 
