const express = require('express'); 
const handlebars = require('express-handlebars'); 
const mongoose = require('mongoose'); 
const expr = require('./config/express.config');
const hbrs = require('./config/handlebars.config');
const mngs = require('./config/mongoose.config');

const app = express(); 

expr.config(app); 
hbrs.config(app); 
mngs.config(); 

app.get('/', (req, res) => {
    res.render('index'); 
}); 

app.listen(4000, () => console.log('Server listening...')); 
