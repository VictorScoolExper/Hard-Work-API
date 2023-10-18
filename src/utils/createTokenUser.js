/* Green Work ERP by Victor Martinez */

const createTokenUser = (user) =>{
    if(user != null){
        return {
            name: user.name, 
            lastName: user.last_name, 
            userId: user.user_id, 
            role: user.role
        }
    } else {
        return {};
    }
    
}

export default createTokenUser;