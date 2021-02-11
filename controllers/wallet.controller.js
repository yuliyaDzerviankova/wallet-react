import mongoose from "mongoose";
import {walletScheme} from "../models/Wallet.js";
import {errorHandler} from "../utils/errorHandler.js";
import {userScheme} from "../models/User.js";

const Wallet = mongoose.model('Wallet', walletScheme);
const User = mongoose.model('User', userScheme);

export const getWallets = async (request, response) => {
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
};

export const addWallet = (request, response) => {
    try {
        const {walletType, start_balance} = request.body;
        const wallet = new Wallet({
            walletType,
            start_balance,
            user: request.user.id
        });
        wallet.save();
        User.findByIdAndUpdate(
            request.user.id,
            {
                $push: {
                    wallets: wallet
                }
            }, {new: true, useFindAndModify: true},
            function (err, user) {
                mongoose.disconnect();
                if (err) return console.log(err);
                response.status(200).json(wallet);
            }
        );

    } catch (e) {
        errorHandler(response, e);
    }
};

export const editWallet = (request, response) => {
    try {
        const {id} = request.params;
        Wallet.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...request.body
                }
            },
            {new: true, useFindAndModify: true},
            function (err, wallet) {
                mongoose.disconnect();
                if (err) return console.log(err);
                response.status(200).json(wallet);
            }
        ).populate('walletType');
    } catch (e) {
        errorHandler(response, e);
    }
};
