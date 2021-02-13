const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Router} = require("express");
const User = require('../models/User');
const userRouter = Router();
const errorHandler = require("../utils/errorHandler");
const auth = require("../middleware/auth.js");

userRouter.put(
    '/update/:id',
    async (request, response) => {
        try {
            if (!request.params) return response.sendStatus(400);

            const {id} = request.params;
            const {body} = request;
            const user = await User.findByIdAndUpdate(
                {_id: id},
                {$set: {...body}},
                {returnOriginal: false});
            response.status(200).json(user);
        } catch (e) {
            errorHandler(response, e);
        }
    });

userRouter.delete(
    '/delete/:id',
    async (request, response) => {
        try {
            const {id} = request.params;
            User.deleteOne({_id: id}, (error, result) => {
                if (error) return console.log(error);

                response.send(result);
            });
        } catch (e) {
            errorHandler(response, e);
        }
    });

userRouter.post(
    '/add',
    async (request, response) => {
        try {
            if (!request.body) return response.sendStatus(400);

            const {name, email, password} = request.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await new User({name, email, password: hashedPassword});
            user.save();
            response.status(201).json(user);
        } catch (e) {
            errorHandler(response, e);
        }
    }
);

userRouter.get(
    '/all',
    auth,
    async (request, response) => {
        try {
            const users = await User.find({});
            const filter = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    wallets: user.wallets
                }
            });
            response.status(200).json(filter);
        } catch (e) {
            errorHandler(response, e);
        }
    });

userRouter.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const {user} = request;
            const {
                id,
                email,
                name,
                wallets
            } = await User
                .findById(user.userId)
                .populate({
                    path: 'wallets',
                    populate: {
                        path: 'walletType',
                    },
                })
                .populate({
                    path: 'profits',
                    populate: {
                        path: 'profitType',
                    },
                })
                .populate({
                    path: 'expenses',
                    populate: {
                        path: 'expenseType',
                    },
                });
            response.status(200).json({
                id,
                email,
                name,
                wallets
            });
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = userRouter;
