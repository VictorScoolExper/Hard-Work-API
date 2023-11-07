/* Green Work ERP by Victor Martinez */

import {createJWT, isTokenValid, attachCookiesToResponse } from './jwt.js';
import createTokenUser from './createTokenUser.js';
import checkPermissions from './checkPermissions.js';
import { connectDB, connection } from './mysql.js';
import getRole from './getRole.js';
import getJobTitle from './getJobTitle.js';

export {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    connectDB, 
    connection,
    getRole,
    getJobTitle
}