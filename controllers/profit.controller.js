import mongoose from "mongoose";
import {errorHandler} from "../utils/errorHandler.js";
import {profitScheme} from "../models/Profit.js";
import {walletScheme} from "../models/Wallet.js";

const Profit = mongoose.model("Profit", profitScheme);
const Wallet = mongoose.model("Wallet", walletScheme);

export const addProfit = (request, response) => {
    try {
        const {name, category, cost, wallet, date} = request.body;
        const profit = new Profit({
            name,
            profitType: category,
            cost,
            wallet,
            date
        });
        console.log(profit.populate('profitType'));
        profit.save();
        Wallet.findOneAndUpdate(
            {_id: wallet._id},
            {
                $push: {
                    profits: profit
                }
            }, {new: true, returnOriginal: false},
            function (err, wallet) {
                mongoose.disconnect();
                if (err) return console.log(err);
                response.status(201).json(profit);
            }
        );
    } catch (e) {
        errorHandler(response, e);
    }
}

export const getProfits = async (request, response) => {
    try {
        const profits = await Profit.find({wallet: request.wallet._id});
        response.status(200).json(profits);
    } catch (e) {
        errorHandler(response, e);
    }
};

export const getProfitById = (request, response) => {
    Profit.findById({_id: request.params.id}, function (err, profitType) {
        if (err) return console.log(err);
        response.send(profitType);
    });
};

export const updateProfit = async (request, response) => {
    try {
        const profit = await Profit.findOneAndUpdate(
            {_id: request.params.id},
            {$set: request.body},
            {new: true}
        );
        response.status(200).json(profit);
    } catch (e) {
        errorHandler(response, e);
    }
}

export const deleteProfit = async (request, response) => {
    try {
        await Profit.remove({_id: request.params.id});
        response.status(200).json({
            message: 'Position was deleted'
        });
    } catch (e) {
        errorHandler(response, e);
    }
}

