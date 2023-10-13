/* Green Work ERP by Victor Martinez */

import { StatusCodes } from 'http-status-codes';
import * as CustomError from '../errors/index.js';
import validator from 'validator';
import Company from '../models/company.js';

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

export {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany
}