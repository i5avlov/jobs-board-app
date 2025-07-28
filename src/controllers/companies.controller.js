const companiesController = require('express').Router(); 
const guards = require('../middlewares/guards.middleware'); 
const companiesService = require('../services/companies.service');
const errorUtils = require('../utils/error.utils');

companiesController
    .get('/add', guards.isAuth(), async (req, res) => { 
        res.render('companies/add'); 
    }) 
    .post('/add', guards.isAuth(), async (req, res) => { 
        const userId = req.user.id; 
        const companyData = req.body; 

        try { 
            const company = await companiesService.add(companyData, userId); 
            res.redirect(`/companies/${company.id}/details`); 
        } catch (err) { 
            res.render('companies/add', { companyData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

module.exports = companiesController; 
