const {Router} = require("express");
const {errorHandler} = require("../utils/errorHandler");
const ExpenseType = require('../models/ExpenseType');
const Icon = require('../models/Icon');

const expenseTypeRouter = Router();

expenseTypeRouter.put(
    '/update/:id',
    async (request, response) => {
        try {
            const {id} = request.params;
            const {body} = request;
            const expenseType = await ExpenseType.findByIdAndUpdate(
                {_id: id},
                {$set: {...body}},
                {returnOriginal: false, new: true});
            response.status(200).json(expenseType);
        } catch (e) {
            errorHandler(response, e)
        }
        if (!request.params) return response.sendStatus(400);
    });

expenseTypeRouter.delete(
    '/delete/:id',
    async (request, response) => {
        try {
            const {id} = request.params;
            await ExpenseType.deleteOne({_id: id});
            response.status(200).json({
                message: 'This expense was deleted'
            });
        } catch (e) {
            errorHandler(response, e);
        }
        if (!request.params) return response.sendStatus(400);
    });

expenseTypeRouter.post(
    '/add',
    async (request, response) => {
        try {
            if (!request.body) return response.sendStatus(400);

            const {name, icon} = request.body;
            const expenseType = await new ExpenseType({name, icon});
            expenseType.save();
            const iconView = await new Icon({icon, isUsed: true});
            await Icon.findOneAndUpdate(
                {icon},
                {$set: {...iconView}},
                {returnOriginal: false},
            );
            response.status(201).json(expenseType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

expenseTypeRouter.get(
    '/:id',
    async (request, response) => {
        try {
            const expenseType = await ExpenseType.findById({_id: request.params.id});
            response.status(200).json(expenseType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

expenseTypeRouter.get(
    '/',
    async (request, response) => {
        try {
            const expensesType = await ExpenseType.find({});
            response.status(200).json(expensesType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = expenseTypeRouter;
