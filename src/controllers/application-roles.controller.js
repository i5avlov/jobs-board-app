const applicationRolesService = require('../services/application-roles.service');

const applicationRolesController = require('express').Router(); 

applicationRolesController 
    .get('/index', async (req, res) => { 
        const applicationRolesData = await applicationRolesService.getAll(); 
        res.render('application-roles/index', { applicationRolesData }); 
    }); 

applicationRolesController 
    .get('/create', (req, res) => { 
        res.render('application-roles/create'); 
    })
    .post('/create', async (req, res) => { 
        const applicationRoleData = req.body; 

        await applicationRolesService.create(applicationRoleData); 

        res.redirect('/application-roles/index'); 
    }); 

module.exports = applicationRolesController; 
