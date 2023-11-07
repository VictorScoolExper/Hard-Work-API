/* Green Work ERP by Victor Martinez */
import { connection } from './index.js';

const getRole = (role_id) => {
    return new Promise((resolve, reject) => {
        connection.query("CALL sp_select_company_name(?)",
            role_id,
            (error, result) => {
                if(error){
                    reject('failed to get role');
                } else {
                    console.log(result);
                    resolve(result[0]);
                }
            }
        )
    })
};

export default getRole;