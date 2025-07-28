const Company = require('../models/Company'); 

module.exports = {
    add: (companyData, userId) => { 
        const { name, description, image } = companyData; 

        return Company.create({
            name: name, 
            description: description, 
            image: image, 
            createdBy: userId 
        }); 

    }, 

    details: (companyId) => { 
        return Company.findById(companyId); 
    }
}; 
