/* Green Work ERP by Victor Martinez */

import { connection } from '../utils/index.js';

class AppSettings {
    constructor(appSetting){
        this.setting_id = appSetting.setting_id;
        this.setting_name = appSetting.setting_name;
        this.setting_value = appSetting.setting_value;
        this.type_value = appSetting.type_value;
    }

    static createAppSetting (appSetting){
        return new Promise((resolve, reject) => {
            connection.query('CALL sp_create_app_setting(?,?,?)', 
            [
                appSetting.setting_name.toLowerCase(),
                appSetting.setting_value.toLowerCase(),
                appSetting.type_value.toLowerCase()
            ]
            , (error, result)=>{
                error ? reject(error) : resolve(result[0])
            })
        })
    }

    static getAppSettings(){
        return new Promise((resolve, reject) =>{
            connection.query('CALL sp_get_app_settings()', (error, result)=>{
                error ? reject(error) : resolve(result[0]);
            });
        })
    }

    static updateAppSetting(appSetting){
        return new Promise((resolve, reject)=>{
            connection.query('CALL sp_update_app_setting(?,?,?)', [
                appSetting.setting_name.toLowerCase(),
                appSetting.setting_value.toLowerCase(),
                appSetting.type_value.toLowerCase()
            ], (error, result) =>{
                error ? reject(error) : resolve(result[0])
            })
        })
    }
}

export default AppSettings;