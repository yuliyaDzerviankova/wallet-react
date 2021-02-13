const {Router} = require("express");
const auth = require("../middleware/auth.js");
const {errorHandler} = require("../utils/errorHandler");
const Wallet = require("../models/Wallet");
const User = require("../models/User");

const walletRouter = Router();

walletRouter.post(
    '/add',
    auth,
    async (request, response) => {
        try {
            const {walletType, start_balance, note} = request.body;
            const wallet = await new Wallet({
                walletType,
                note,
                start_balance,
                user: request.user.id
            });
            wallet.save();
            await User.findByIdAndUpdate(
                request.user.id,
                {
                    $push: {
                        wallets: wallet
                    }
                }, {new: true, useFindAndModify: true});
            response.status(200).json(wallet);
        } catch (e) {
            errorHandler(response, e);
        }
    });

walletRouter.put(
    '/edit/:id',
    auth,
    async (request, response) => {
        try {
            const {id} = request.params;
            const wallet = await Wallet.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...request.body
                    }
                },
                {new: true, useFindAndModify: true}).populate('walletType');
            response.status(200).json(wallet);
        } catch (e) {
            errorHandler(response, e);
        }
    });

walletRouter.get(
    '/',
    auth,
    async (request, response) => {
        try {
            const wallets = await Wallet
                .find({user: request.user.id})
                .populate('walletType')
                .populate('expenses')
                .populate('profits')
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
            wallets.map(wallet => {
                    const profits = wallet.profits;
                    const expenses = wallet.expenses;
                    for (let i = 0; i < profits.length; i++) {
                        wallet.balance += profits[i].cost;
                        wallet.profits_cost += profits[i].cost;
                    }
                    for (let i = 0; i < expenses.length; i++) {
                        wallet.balance -= expenses[i].cost;
                        wallet.expenses_cost += expenses[i].cost;
                    }
                    wallet.balance += wallet.start_balance;
                }
            );
            response.status(200).json(wallets);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = walletRouter;
