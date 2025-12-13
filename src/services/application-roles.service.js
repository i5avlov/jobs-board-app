const ApplicationRole = require("../models/ApplicationRole");

module.exports = { 
    getAll: () => { 
        return ApplicationRole
            .find({})
            .lean(); 
    }, 

    create: (applicationRoleData) => { 
        const name = applicationRoleData['application-role-name']; 
        const description = applicationRoleData.description; 

        return ApplicationRole
            .create({
                name: name, 
                description: description, 
                createdAt: Date.now(), 
            }); 
    }, 


}; 
