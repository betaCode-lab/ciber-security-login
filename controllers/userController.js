import { body, validationResult } from 'express-validator';
import User from "../models/user.js";
import { generateToken } from '../helpers/tokens.js';

// Get the form login page
const loginPage = (req, res) => {
    res.render('auth/login', {
        title: 'Log in'
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    // If user doesn't exist
    if(!user) {
        return res.render('auth/login', {
            title: 'login',
            errors: [{msg: 'This user doesn\'t exist'}]
        });
    }

    const matchPasswords = await user.validatePassword(password, user.password);
    if(!matchPasswords) {
        return res.render('auth/login', {
            title: 'login',
            errors: [{msg: 'Incorrect Password'}]
        });
    }

    const token = generateToken({ id: user.id, email });

    return res.cookie('_token', token, {
        httpOnly: true
    }).redirect('/home/terms');
}

// Get the form signup page
const signupPage = (req, res) => {
    res.render('auth/signup', {
        title: 'Sign Up'
    });
}

const signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // Validate all fields
        await Promise.all([,
            body('username').trim().isLength({min: 10}).escape().withMessage('Username must be at least 10 characters').run(req),
            body('username').isAlpha().withMessage('Username only accept letters').run(req),
            body('email').trim().isEmail().escape().withMessage('This email is not valid').run(req),
            body('password').trim().isLength({min: 8}).withMessage('Password must be at least 8 characters').run(req),
            body('confirmPassword').trim().matches(password).withMessage('Passwords doesn\'t match').run(req)
        ]);

        // Removing white spaces
        username = username.trim();
        email = email.trim();

        const result = validationResult(req);

        if(!result.isEmpty()) {
            return res.render('auth/signup', {
                title: 'Sign Up',
                errors: result.array(),
                username,
                email
            });
        }

        // Check if that user already exist
        const user = await User.findOne({email});

        if(user) {
            return res.render('auth/signup', {
                title: 'Sign Up',
                errors: [{msg: 'This user already exist'}],
                username,
                email
            });
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        res.redirect('/auth/login');

    } catch (error) {
        console.log(error);
    }
}

// Logout
const logout = (req, res) => {
    // Clean the cookie and redirect
    res.clearCookie('_token').status(200).redirect('/auth/login');
}

export {
    loginPage,
    login,
    signupPage,
    signup,
    logout
}