/* Green Work ERP by Victor Martinez */

const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const createJWT = ({payload}) =>{
    const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.lifetime
    })
    return token;
};

const isTokenValid = ({token}) => jwt.verify(token, config.jwt.secret);

const attachCookiesToResponse = ({res, user}) =>{
    const token = createJWT({payload:user});

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: false,
        signed: true,
    });
    // signed is bool to verify if it is https
    // secure: config.node.NODE_ENV === 'production',
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }