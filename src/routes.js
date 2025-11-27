const routes = require('express').Router(); 
const authController = require('./controllers/auth.controller');
const companiesController = require('./controllers/companies.controller');
const homeController = require('./controllers/home.controller'); 
const representativesController = require('./controllers/representatives.controller');
const usersController = require('./controllers/users.controller');

routes.use(homeController); 
routes.use('/auth', authController); 
routes.use('/users', usersController); 
routes.use('/companies', companiesController); 
routes.use('/representatives', representativesController); 

module.exports = routes; 
