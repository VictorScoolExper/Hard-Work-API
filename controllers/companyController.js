const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const validator = require("validator");
const Company = require("../models/company");

// TODO: Create Company
const createCompany = async (req, res) => {
    // validate params
    const {name} = req.body;
    if(!name || !validator.isAlpha(name)){
        throw new CustomError.BadRequestError("Invalid name type");
    }
    const lowercaseName = name.toLowerCase();
    // send to db
    await Company.createCompany(lowercaseName);
    res.status(StatusCodes.CREATED).json({msg: `${name} created correctly`});
}
// TODO: get all companies
const getCompanies = async (req, res) =>{
    const companies = await Company.getAllCompanies();

    res.status(StatusCodes.OK).json({companies: companies, length: companies.length});
}
// TODO: get by company_id
const getCompanyById = async (req, res) =>{
    // validate params
    const {id: companyId} = req.params;
    if(!companyId || !validator.isInt(companyId)){
        throw new CustomError.BadRequestError("Invalid company id type");
    }
    const companyIdInt = parseInt(companyId);
    // send to db
    const companyInfo = await Company.getCompanyById(companyIdInt);
    res.status(StatusCodes.OK).json({company: companyInfo })
}

// TODO: Edit Company
const updateCompany = async (req, res) =>{
    // validate params
    const {id: companyId} = req.params;
    const {name} = req.body;
    if(!name || !validator.isAlpha(name)){
        throw new CustomError.BadRequestError("Invalid name type");
    }
    if(!companyId || !validator.isInt(companyId)){
        throw new CustomError.BadRequestError("Invalid company id type");
    }
    const lowercaseName = name.toLowerCase();
    const companyIdInt = parseInt(companyId);
    // send to db
    await Company.updateCompany(companyIdInt, lowercaseName);
    res.status(StatusCodes.OK).json({msg: `${companyIdInt} is updated` });
}
module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}