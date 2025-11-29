const LeadRepresentative = require('../models/LeadRepresentative'); 
const CompanyRepresentative = require('../models/CompanyRepresentative'); 
const RepresentativeApplication = require('../models/RepresentativeApplication'); 

module.exports = {
    add: (companyRepresentativeId) => { 
        return LeadRepresentative.create({
            companyRepresentative: companyRepresentativeId 
        }); 
    }, 

    accept: async (userId, companyId) => { 
        const application = await RepresentativeApplication
            .findOne({ user: userId }); 
        application.isAccepted = true; 
        application.isRejected = false;
        application.save(); 
    }, 

    reject: async (userId, companyId) => { 
        const application = await RepresentativeApplication
            .findOne({ user: userId }); 
        application.isRejected = true; 
        application.isAccepted = false; 
        application.save(); 
    }, 

    deactivate: async (userId, companyId) => { 
        const representative = await CompanyRepresentative
            .findOne({ user: userId }); 
        representative.isActive = false; 
        representative.save(); 
    }, 

    reactivate: async (userId, companyId) => { 
        const representative = await CompanyRepresentative
            .findOne({ user: userId }); 
        representative.isActive = true; 
        representative.save(); 
    }, 

}; 
