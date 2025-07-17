const express = require('express'); 
const handlebars = require('express-handlebars'); 
const mongoose = require('mongoose'); 

const app = express(); 

app.engine('hbs', handlebars.engine({ extname: 'hbs' })); 
app.set('view engine', 'hbs'); 
app.set('views', 'src/views'); 

app.use(express.static('src/public')); 
app.use(express.urlencoded()); 

mongoose
    .connect('mongodb://localhost:27017', { dbName: 'jobs_board_app' }) 
    .then(() => console.log('Connected to DB.')) 
    .catch((err) => console.log('Error connecting to DB:', err.message)); 

app.get('/', (req, res) => {
    res.render('index'); 
}); 

app.listen(4000, () => console.log('Server listening...')); 
