import express from 'express';
import {
    UserModel
} from '../DAO/models/users.model.js';

export const routerLogin = express.Router();

routerLogin.post('/register', async (req, res) => {
    const {
        firstName,
        lastName,
        age,
        email,
        password
    } = req.body;
    if (!firstName || !lastName || !age || !email || !password) {
        return res.status(400).render('error-page', {
            msg: 'please complete all fields'
        });
    }
    try {
        await UserModel.create({
            firstName,
            lastName,
            age,
            email,
            password,
            admin: false
        });
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        req.session.age = age;
        req.session.email = email;
        req.session.admin = false;
        return res.redirect('/profile');
    } catch (e) {
        console.log(e);
        return res.status(400).render('error-page', {
            msg: 'please check your email and try again later'
        });
    }
});


routerLogin.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    console.log(email, password)
    if (!email || !password) {
        return res.status(400).render('error-page', {
            msg: 'the username or password does not exist'
        });
    }
    try {
        const foundUser = await UserModel.findOne({
            email
        });
        if (foundUser && foundUser.password === password) {
            req.session.firstName = foundUser.firstName;
            req.session.lastName = foundUser.lastName;
            req.session.age = foundUser.age
            req.session.email = foundUser.email;
            req.session.admin = foundUser.admin;
            return res.redirect('/view/products');
        } else {
            return res.status(400).render('error-page', {
                msg: 'the username or password is incorrect, please try again'
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).render('error-page', {
            msg: 'unexpected server error'
        });
    }
});