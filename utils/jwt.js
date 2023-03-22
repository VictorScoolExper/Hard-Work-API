const jwt = require('jsonwebtoken');
const config = require('../config');

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
        secure: config.node.NODE_ENV === 'production',
        signed: true,
    });
}

module.exports = { createJWT, isTokenValid, attachCookiesToResponse }