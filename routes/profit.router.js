const {Router} = require("express");
const auth = require("../middleware/auth.js");
const {errorHandler} = require("../utils/errorHandler");
const Wallet = require("../models/Wallet");
const Profit = require("../models/Profit");

const profitRouter = Router();

profitRouter.put(
    '/update/:id',
    async (request, response) => {
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
    });

profitRouter.delete(
    '/delete/:id',
    async (request, response) => {
        try {
            await Profit.remove({_id: request.params.id});
            response.status(200).json({
                message: 'Position was deleted'
            });
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitRouter.post(
    '/add',
    auth,
    async (request, response) => {
        try {
            const {name, category, cost, wallet, date} = request.body;
            const profit = await new Profit({
                name,
                profitType: category,
                cost,
                wallet,
                date
            });
            profit.save();
            await Wallet.findOneAndUpdate(
                {_id: wallet._id},
                {
                    $push: {
                        profits: profit
                    }
                }, {new: true, returnOriginal: false});
            response.status(201).json(profit);
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitRouter.get(
    '/:id',
    async (request, response) => {
        try {
            const profit = await Profit.findById({_id: request.params.id});
            response.status(200).send(profit);
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitRouter.get(
    '/',
    async (request, response) => {
        try {
            const profits = await Profit.find({wallet: request.wallet._id})
            response.status(200).send(profits);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = profitRouter;
