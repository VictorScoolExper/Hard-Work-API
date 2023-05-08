const User = require('../models/user');
const bcrypt = require('bcrypt');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser} = require('../utils');

const login = async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.getUserInfo(email);

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    // need to create comparePassword method
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json(tokenUser);
}

// TODO: eliminate function
const register = async (req, res) =>{
    const {name, last_name, cell_number, role, birth_date, email, password} = req.body;

    if(!name || !last_name || !cell_number || !birth_date || !email || !password){
        throw new CustomError.BadRequestError('Please provide all the details');
    }


    const emailAlreadyExist = await User.findEmailAuth(email);
    if(emailAlreadyExist === 1){
        throw new CustomError.BadRequestError('Email Already Exists')
    } 

    // modify to be able to create employee accounts or client accounts logins
    isFirstAccount = await User.isUserEmpty();
    if(isFirstAccount === 0){
        throw new CustomError.BadRequestError('You are not allowed to create account');
    }

    // here we must hash password before saving password
    const newPassword = await bcrypt.hash(password.toString(), 10);
    
    const newUser = {
        name: name.toLowerCase(), 
        last_name: last_name.toLowerCase(),
        cell_number,
        role: role.toLowerCase(),
        birth_date,
        email,
        password: newPassword
    }

    const user = await User.createUser(newUser);
    
    const tokenUser = createTokenUser(user);
    
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}

const logout = async (req, res)=>{
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({msg: 'user logged out!'});
}

const checkPermission = (req, res) =>{
    res.status(StatusCodes.OK).json({valid: 'true'});
}

module.exports = {
    login,
    register, 
    logout,
    checkPermission
}

