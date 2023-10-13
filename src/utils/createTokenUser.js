/* Green Work ERP by Victor Martinez */

const createTokenUser = (user) =>{
    return {
        name: user.name, 
        lastName: user.last_name, 
        userId: user.user_id, 
        role: user.role
    }
    
}

export default createTokenUser;