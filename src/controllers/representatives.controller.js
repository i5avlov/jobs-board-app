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

        // Representative UI 
        const representativeAds = await adsService.getAdsByRepresentativeId(representativeId); 

        res.render('representatives/dashboard', { 
            representatives, representativeAds, isLead 
        }); 
    }); 

module.exports = representativesController; 
