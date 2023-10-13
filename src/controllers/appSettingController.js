/* Green Work ERP by Victor Martinez */

import {StatusCodes} from 'http-status-codes';
import AppSettings from '../models/app_settings.js';

const createAppSetting = async (req, res)=>{
    const appSetting = req.body;

    await AppSettings.createAppSetting(appSetting);

    res.status(StatusCodes.CREATED).json({mgs: "App settings created"});
}

const getAppSettings = async (req, res) => {
    const response = await AppSettings.getAppSettings();
    res.status(StatusCodes.OK).json({appSettings: response, status: 1});
}

const updateAppSetting = async (req, res) => {
    const appSetting = req.body;

    await AppSettings.updateAppSetting(appSetting);
    res.status(StatusCodes.OK).json({msg: "App Setting updated", status: 1});
}

export {
    createAppSetting,
    getAppSettings,
    updateAppSetting
}