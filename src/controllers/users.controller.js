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

// usersController
//     .get('/profile/edit', (req, res) => {
//         res.render(''); 
//     }) 
//     .post('/profile/edit', async (req, res) => { 
//         const profileData = req.body; 

//         try { 
//             const authToken = await authService.register(profileData); 
//             res.cookie('user', authToken); 
//             res.redirect('/'); 
//         } catch (err) { 
//             res.render('', { profileData, errors: errorUtils.normalize(err) }); 
//         }
        
//     }); 



module.exports = usersController; 