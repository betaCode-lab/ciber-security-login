import express from "express";

import 
{ 
    loginPage, 
    login, 
    signupPage,
    signup,
    logout
} from "../../controllers/userController.js";

const router = express.Router();

// Log in
router.get('/auth/login', loginPage);
router.post('/auth/login', login);

// Sign Up
router.get('/auth/signup', signupPage);
router.post('/auth/signup', signup);

// logout
router.get('/auth/logout', logout)

export default router;