import express from 'express';
import { checkAdmin, checkUser, checkUserLoggedIn } from '../middlewares/auth.js';
export const routerViews = express.Router();

routerViews.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.render('error-page', {
                msg: 'could not close the session'
            });
        }
        return res.redirect('/login');
    });
});

routerViews.get('/login', checkUserLoggedIn, (req, res) => {
    res.render('login-form');
});

routerViews.get('/register', checkUserLoggedIn, (req, res) => {
    res.render('register-form');
});

routerViews.get('/profile', checkUser, (req, res) => {
    res.render('profile', {firstName: req.session.firstName, lastName: req.session.lastName, age: req.session.age, admin: req.session.admin});
});

routerViews.get('/admin', checkAdmin, (req, res) => {
    res.send("Welcome to the secret place, if you got here it's because you're an admin!");
});