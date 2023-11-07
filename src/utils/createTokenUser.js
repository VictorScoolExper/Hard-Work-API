/* Green Work ERP by Victor Martinez */
import getRole from "./getRole.js";

const createTokenUser = async (user) =>{
    if(user != null){
        const role = await getRole(user.role_id);

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