const leadsController = require('express').Router(); 
const APPLICATION_ROLES = require('../constants/application-roles.constants');
const leadsService = require('../services/leads.service');
const representativesService = require('../services/representatives.service'); 
const applicationRolesUtils = require('../utils/application-roles.utils'); 

leadsController
    .get('/dashboard', async (req, res) => { 
        const userId = req.user?.id; 
        const representativeId = await representativesService.getRepresentativeIdByUserId(userId); 
        const companyId = await representativesService.getCompanyIdByRepresentativeId(representativeId); 

        // Team members 
        const representatives = await representativesService
            .getRepresentativesByCompanyId(companyId); 

        // Representative applications 
        const representativeApplications = await representativesService
            .getRepresentativeApplicationsByCompanyId(companyId); 
    
        res.render('leads/dashboard', { 
            representativeApplications, representatives 
        }); 
    }); 

leadsController 
    .post('/accept', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative application as accepted 
        await leadsService.accept(userId, companyId); 
        // Adding user as a company representative 
        await representativesService.create(userId, companyId); 

        // Assigning the user role of company representative 
        await applicationRolesUtils.putUserInRole(userId, APPLICATION_ROLES.COMPANY_REPRESENTATIVE); 

        res.redirect('/leads/dashboard'); 

    }) 
    .post('/reject', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative application as accepted 
        await leadsService.reject(userId, companyId); 

        res.redirect('/leads/dashboard'); 

    }) 
    .post('/deactivate', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative as deactivated 
        await leadsService.deactivate(userId, companyId); 

        res.redirect('/leads/dashboard'); 

    })
    .post('/reactivate', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative as active 
        await leadsService.reactivate(userId, companyId); 

        res.redirect('/leads/dashboard'); 

    }); 

module.exports = leadsController; 
