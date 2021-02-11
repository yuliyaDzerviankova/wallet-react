const {Router} = require("express");
const auth = require("../middleware/auth.js");
const {errorHandler} = require("../utils/errorHandler");
const Wallet = require("../models/Wallet");
const Expense = require("../models/Expense");

const expenseRouter = Router();

expenseRouter.post(
    '/add',
    auth,
    async (request, response) => {
        try {
            const {name, category, note, cost, wallet, date} = request.body;
            const expense = await new Expense({
                name,
                expenseType: category,
                note,
                cost,
                wallet,
                date
            });
            expense.save();
            await Wallet.findOneAndUpdate(
                {_id: wallet._id},
                {
                    $push: {
                        expenses: expense
                    }
                }, {new: true, returnOriginal: false});
            response.status(201).json(expense);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = expenseRouter;