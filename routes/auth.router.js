const config = require('config');
const bcrypt = require("bcryptjs");
const {Router} = require("express");
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const authRouter = Router();

authRouter.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Min length is 6 characters')
            .isLength({min: 6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid register credentials'
                });
            }

            const {email, name, password} = request.body;
            const candidate = await User.findOne({email});

            if (candidate) {
                return response.status(400).json({message: 'This user is already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, name, password: hashedPassword, wallets: []});

            await user.save();

            response.status(201).json({message: 'User was created'});

        } catch (e) {
            response.status(500).json({message: 'Ops... Something went wrong. Try again'});
        }
    });

authRouter.post(
    '/login.tsx',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (request, response) => {
        try {
            const {email, password} = request.body;


            const user = await User.findOne({email});

            if (!user) {
                return response.status(400).json({message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return response.status(400).json({message: 'Invalid password, try again'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '7d'}
            );

            response.status(200).json({token, userId: user.id});

        } catch (e) {
            response.status(500).json({message: 'Ops... Something went wrong. Try again'});
        }
    }
);

module.exports = authRouter;