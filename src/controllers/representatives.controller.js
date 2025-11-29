const representativesController = require('express').Router(); 
const adsService = require('../services/ads.service');
const companiesService = require('../services/companies.service'); 
const representativesService = require('../services/representatives.service');

representativesController
    .get('/apply', async (req, res) => { 
        const companies = await companiesService
            .getAll()
            .select('_id name')
            .lean(); 
        res.render('representatives/apply', { companies }); 
    })
    .post('/apply', async (req, res) => { 
        const userId = req.user.id; 
        const companyId = req.body['company_id']; 

        await representativesService.apply(userId, companyId); 

        res.redirect('/'); 
    }); 

representativesController
    .get('/dashboard', async (req, res) => { 
        const userId = req.user?.id; 
        const representativeId = await representativesService.getRepresentativeIdByUserId(userId); 
        const companyId = await representativesService.getCompanyIdByRepresentativeId(representativeId); 
        const isLead = await representativesService.isLead(representativeId); 

        // Team members 
        const representatives = await representativesService
            .getRepresentativesByCompanyId(companyId); 

        let representativeApplications = {}; 

        // Lead UI additions 
        if (isLead) { 
            representativeApplications = await representativesService
                .getRepresentativeApplicationsByCompanyId(companyId); 
        } 

        // Representative UI 
        const representativeAds = await adsService.getAdsByRepresentativeId(representativeId); 

        res.render('representatives/dashboard', { 
            representativeApplications, representatives, representativeAds 
        }); 
    }); 

representativesController 
    .post('/accept', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative application as accepted 
        await representativesService.accept(userId, companyId); 
        // Adding user as a company representative 
        await representativesService.create(userId, companyId); 

        res.redirect('/representatives/dashboard'); 

    }) 
    .post('/reject', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative application as accepted 
        await representativesService.reject(userId, companyId); 

        res.redirect('/representatives/dashboard'); 

    }) 
    .post('/deactivate', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative as deactivated 
        await representativesService.deactivate(userId, companyId); 

        res.redirect('/representatives/dashboard'); 

    })
    .post('/reactivate', async (req, res) => { 
        // Getting current lead representative user id and company id 
        const leadUserId = req.user.id; 
        const companyId = await representativesService.getCompanyIdByRepresentativeUserId(leadUserId); 

        // Representative candidate user id 
        const userId = req.body['user-id']; 

        // Marking representative as active 
        await representativesService.reactivate(userId, companyId); 

        res.redirect('/representatives/dashboard'); 

    }); 


module.exports = representativesController; 
