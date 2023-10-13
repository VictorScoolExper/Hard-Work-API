/* Green Work ERP by Victor Martinez */

import {StatusCodes} from 'http-status-codes';
import Material from '../models/material.js';

const createMaterial = async (req, res) =>{
    const material = req.body;

    await Material.createMaterial(material);

    res.status(StatusCodes.CREATED).json({msg: "Material created successfully!", status: 1});
}

const getMaterials = async (req, res) =>{
    const response = await Material.getMaterials();
    res.status(StatusCodes.OK).json({materials: response, length: response.length, status: 1})
}

const updateMaterial = async (req, res) =>{
    const {id} = req.params;
    const material = req.body;

    material['material_id'] = id;

    await Material.updateMaterial(material);
    res.status(StatusCodes.OK).json({msg: "Material updated correctly", status: 1})
}

export {
    createMaterial,
    getMaterials,
    updateMaterial
}