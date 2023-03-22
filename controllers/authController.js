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

    const user = await User.findEmail(email);

    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    // need to create comparePassword method
    const isPasswordCorrect = await user.comparePassword(password);

    // if(!isPasswordCorrect){
    //     throw new CustomError.UnauthenticatedError('Invalid Credentials');
    // }

    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({res, user: tokenUser});
    const userId = user[0][0].user_id;
    res.status(StatusCodes.OK).json({userid: userId});
}


const register = async (req, res) =>{
    const {name, last_name, cell_number, role, age, email, password} = req.body;

    if(!name || !last_name || !cell_number || !age || !email || !password){
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
    
    const user = await User.createUser({
        name, 
        last_name,
        cell_number,
        role,
        age,
        email,
        password: newPassword
    });
    // user = new User({
    //     user_id: 1,
    //     name: 'John',
    //     last_name: 'Doe',
    //     cell_number: '12345678',
    //     role: 'user',
    //     email: 'john.doe@example.com',
    //     password: 'password'
    //   });
    const tokenUser = createTokenUser(user);
    // attachCookiesToResponse Not working
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}

module.exports = {
    login,
    register
}