/* Green Work ERP by Victor Martinez */

import * as CustomError from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) =>{

    //if user is admin it will allow
    if(requestUser.role === 'admin'){
        return
    }
    //if user is looking for his own id it will be allowed
    if(requestUser.userId === resourceUserId.toString()){
        return
    }

    // add others roles here

    throw new CustomError.UnauthorizedError('Not authorized to access this route');
};

export default checkPermissions;