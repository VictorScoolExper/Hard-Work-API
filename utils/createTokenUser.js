const createTokenUser = (user) =>{
    return {
        name: user.name, 
        lastName: user.last_name, 
        userId: user.user_id, 
        role: user.role
    }
    
}

module.exports = createTokenUser;