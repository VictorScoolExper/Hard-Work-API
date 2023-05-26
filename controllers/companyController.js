const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const validator = require("validator");
const Company = require("../models/company");

// TODO: Create Company
const createCompany = async (req, res) =>{
    const company = req.body;

    await Company.createCompany(company);

    res.status(StatusCodes.CREATED).json({msg: "created company successfully"});
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
    
    // send to db
    const companyInfo = await Company.getCompanyById(companyId);
    res.status(StatusCodes.OK).json({company: companyInfo })
}

// TODO: Edit Company
const updateCompany = async (req, res) =>{
    // validate params
    const {id: companyId} = req.params;
    const company = req.body;
    
    // send to db
    await Company.updateCompany(companyId, company);
    res.status(StatusCodes.OK).json({msg: `${companyId} is updated` });
}

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}