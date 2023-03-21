const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser} = require('../utils');

const login = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findEmail(email);

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    // need to create comparePassword method
    // const isPasswordCorrect = await user.comparePassword(password);
    // if(!isPasswordCorrect){
    //     throw new CustomError.UnauthenticatedError('Invalid Credentials');
    // }

    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({user: user});
}

module.exports = {
    login
}