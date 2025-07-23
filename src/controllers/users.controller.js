const authService = require('../services/auth.service'); 
const usersService = require('../services/users.service'); 
const errorUtils = require('../utils/error.utils');

const usersController = require('express').Router(); 

usersController
    .get('/profile', async (req, res) => { 
        const email = req.user.email; 
        const userData = await usersService.getProfileByEmail(email).lean(); 

        res.render('users/profile', { userData }); 
    }); 

usersController
    .get('/profile/edit', async (req, res) => { 
        const email = req.user.email; 
        const userData = await usersService.getProfileForEditByEmail(email).lean(); 

        res.render('users/profile/edit', { userData }); 
    }) 
    .post('/profile/edit', async (req, res) => { 
        const email = req.user.email; 
        const updateData = req.body; 

        try { 
            await usersService.update(email, updateData); 
            res.redirect('/users/profile'); 
        } catch (err) { 
            res.render('users/profile/edit', { updateData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 



module.exports = usersController; 