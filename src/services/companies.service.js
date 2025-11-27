const Company = require('../models/Company'); 

module.exports = { 
    getAll: () => {
        return Company.find({}); 
    }, 

    add: (companyData, userId) => { 
        const { name, description, imageUrl } = companyData; 

        return Company.create({
            name: name, 
            description: description, 
            imageUrl: imageUrl, 
            createdBy: userId 
        }); 

    }, 

    details: (companyId) => { 
        return Company.findById(companyId); 
    }
}; 
