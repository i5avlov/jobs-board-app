const adsController = require('express').Router(); 
const adsService = require('../services/ads.service');
const representativesService = require('../services/representatives.service'); 
const errorUtils = require('../utils/error.utils'); 

adsController
    .get('/', async (req, res) => { 
        const adsData = await adsService.getAll(); 
        res.render('ads/index', { adsData }); 
    }); 

adsController 
    .get('/create', (req, res) => { 
        res.render('ads/create'); 
    }) 
    .post('/create', async (req, res) => { 
        const userId = req.user.id; 
        const representativeId = await representativesService.getRepresentativeIdByUserId(userId); 
        const adData = req.body; 

        try { 
            const ad = await adsService.create(adData, representativeId); 
            res.redirect(`/ads/details/${ad._id}`); 
        } catch(err) {
            res.render('ads/create', { adData, errors: errorUtils.normalize(err) }); 
        }

    }); 

adsController 
    .get('/details/:adId', async (req, res) => { 
        const adId = req.params.adId; 
        const adData = await adsService.details(adId); 

        res.render('ads/details', { adData }); 
    }); 


module.exports = adsController; 
