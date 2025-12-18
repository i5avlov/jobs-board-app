const usersController = require('express').Router(); 
const authService = require('../services/auth.service'); 
const usersService = require('../services/users.service'); 
const guards = require('../middlewares/guards.middleware'); 
const errorUtils = require('../utils/error.utils'); 
const userRolesService = require('../services/user-roles.service');

usersController
    .get('/profile', guards.isAuth(), async (req, res) => { 
        const email = req.user.email; 
        const userData = await usersService.getProfileByEmail(email).lean(); 

        res.render('users/profile', { userData }); 
    }); 

usersController
    .get('/profile/edit', guards.isAuth(), async (req, res) => { 
        const email = req.user.email; 
        const userData = await usersService.getProfileForEditByEmail(email).lean(); 

        res.render('users/profile/edit', { userData }); 
    }) 
    .post('/profile/edit', guards.isAuth(), async (req, res) => { 
        const email = req.user.email; 
        const updateData = req.body; 

        try { 
            await usersService.update(email, updateData); 
            res.redirect('/users/profile'); 
        } catch (err) { 
            res.render('users/profile/edit', { updateData, errors: errorUtils.normalize(err) }); 
        }
        
    }); 

usersController 
    .get('/', async (req, res) => { 
       const usersRoles = await userRolesService.getAll(); 

       res.render('users/index', { usersRoles }); 
    }); 


module.exports = usersController; 