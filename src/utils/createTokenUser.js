/* Green Work ERP by Victor Martinez */
import CompanyRole from "../models/company_roles.js";

const createTokenUser = async (user) =>{
    if(user != null){
        const role = await CompanyRole.selectCompanyRoleName(user.role_id);

        return {
            name: user.name, 
            lastName: user.last_name, 
            userId: user.user_id, 
            role: role
        }
    } else {
        return {};
    }
    
}

export default createTokenUser;