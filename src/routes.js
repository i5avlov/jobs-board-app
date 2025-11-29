const routes = require('express').Router(); 
const adsController = require('./controllers/ads.controller');
const authController = require('./controllers/auth.controller');
const companiesController = require('./controllers/companies.controller');
const homeController = require('./controllers/home.controller'); 
const leadsController = require('./controllers/leads.controller');
const representativesController = require('./controllers/representatives.controller');
const usersController = require('./controllers/users.controller');

routes.use(homeController); 
routes.use('/auth', authController); 
routes.use('/users', usersController); 
routes.use('/companies', companiesController); 
routes.use('/representatives', representativesController); 
routes.use('/leads', leadsController); 
routes.use('/ads', adsController); 

module.exports = routes; 
