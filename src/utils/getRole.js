/* Green Work ERP by Victor Martinez */
import { connection } from './index.js';

export default function getRole (role_id) {
    return new Promise((resolve, reject) => {
        connection.query("CALL sp_select_company_role_name(?)",
            role_id,
            (error, result) => {
                if(error){
                    reject('failed to get role');
                } else {
                    resolve((result[0][0]).name);
                }
            }
        )
    })
};

