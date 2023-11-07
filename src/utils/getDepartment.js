/* Green Work ERP by Victor Martinez */
import { connection } from './index.js';

export default function getDepartment (department_id) {
    return new Promise((resolve, reject) => {
        connection.query("CALL sp_select_department_name(?)",
            department_id,
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