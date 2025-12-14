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

    update: (applicationRoleId, updateData) => { 
        const { name, description } = updateData; 

        return ApplicationRole
            .findByIdAndUpdate(applicationRoleId, {
                name: name, 
                description: description 
            }); 

    }, 

    getUpdate: (applicationRoleId) => { 
        return ApplicationRole
            .findById(applicationRoleId)
            .select({ name: true, description: true })
            .lean(); 
    }, 

    getApplicationRoleIdByName: async (applicationRoleName) => { 
        const applicationRole = await ApplicationRole.findOne({ name: applicationRoleName }); 

        // Role not found 
        if (applicationRole === null) { 
            throw new Error('Application role does not exist.'); 
        } 

        return applicationRole._id; 
    }


}; 
