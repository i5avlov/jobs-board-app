const companiesController = require('express').Router(); 
const APPLICATION_ROLES = require('../constants/application-roles.constants');
const guards = require('../middlewares/guards.middleware'); 
const companiesService = require('../services/companies.service');
const leadsService = require('../services/leads.service');
const representativesService = require('../services/representatives.service');
const errorUtils = require('../utils/error.utils'); 
const applicationRolesUtils = require('../utils/application-roles.utils'); 

companiesController
    .get('/add', guards.isAuth(), async (req, res) => { 
        res.render('companies/add'); 
    }) 
    .post('/add', guards.isAuth(), async (req, res) => { 
        const userId = req.user.id; 
        const companyData = req.body; 

        try { 
            // Creates company 
            const company = await companiesService.add(companyData, userId); 
            // Sets user as company representative and lead representative 
            const representative = await representativesService.create(userId, company.id); 
            const lead = await leadsService.add(representative.id); 

            // Assigns user the roles of company representative and lead 
            applicationRolesUtils.putUserInRole(userId, APPLICATION_ROLES.COMPANY_REPRESENTATIVE); 
            applicationRolesUtils.putUserInRole(userId, APPLICATION_ROLES.LEAD_REPRESENTATIVE); 

            res.redirect(`/companies/${company.id}/details`); 
        } catch (err) { 
            res.render('companies/add', { companyData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

companiesController
    .get('/:companyId/details', async (req, res) => { 
        const companyId = req.params.companyId; 
        const companyData = await companiesService.details(companyId).lean(); 

        res.render('companies/details', { companyData }); 
    }); 

module.exports = companiesController; 
