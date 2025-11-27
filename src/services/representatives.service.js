const CompanyRepresentative = require('../models/CompanyRepresentative'); 
const RepresentativeApplication = require('../models/RepresentativeApplication'); 
const LeadRepresentative = require('../models/LeadRepresentative'); 

module.exports = {
    create: (userId, companyId) => { 
        return CompanyRepresentative.create({
            user: userId, 
            company: companyId, 
            isActive: true 
        }); 
    }, 

    apply: (userId, companyId) => { 
        return RepresentativeApplication.create({
            user: userId, 
            company: companyId, 
            isAccepted: false, 
            isRejected: false, 
            addedAt: Date.now() 
        }); 
    }, 

    getRepresentativeIdByUserId: async (userId) => { 
        const representative = await CompanyRepresentative
            .findOne({ user: userId }); 

        return representative._id; 
    }, 

    isLead: async (representativeId) => { 
        return await LeadRepresentative
            .exists({ companyRepresentative: representativeId }) !== null; 
    }, 

    getCompanyIdByRepresentativeUserId: async (userId) => { 
        const representative = await CompanyRepresentative
            .findOne({ user: userId }); 
        return representative.company; 

    }, 

    getCompanyIdByRepresentativeId: async (representativeId) => { 
        const representative = await CompanyRepresentative
            .findOne({ _id: representativeId }); 

        return representative.company; 
    }, 

    getRepresentativeApplicationsByCompanyId: async (companyId) => { 
        let representativeApplications = await RepresentativeApplication 
            .find({ company: companyId }) 
            .select('user isAccepted isRejected') 
            .populate('user')
            .lean(); 
            
        return {
            pending: representativeApplications.filter(a => a.isAccepted === false && a.isRejected === false), 
            rejected: representativeApplications.filter(a => a.isRejected) 
        }; 
    }, 

    getRepresentativesByCompanyId: async (companyId) => { 
        let representatives = await CompanyRepresentative
            .find({ company: companyId }) 
            .select('user isActive') 
            .populate('user')
            .lean(); 

        return {
            active: representatives.filter(r => r.isActive === true), 
            deactivated: representatives.filter(r => r.isActive === false) 
        }; 
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
