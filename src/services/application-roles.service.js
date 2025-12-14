const ApplicationRole = require("../models/ApplicationRole");

module.exports = { 
    getAll: () => { 
        return ApplicationRole
            .find({})
            .lean(); 
    }, 

    create: (applicationRoleData) => { 
        const { name, description } = applicationRoleData; 

        return ApplicationRole
            .create({
                name: name, 
                description: description, 
                createdAt: Date.now(), 
            }); 
    }, 


}; 
