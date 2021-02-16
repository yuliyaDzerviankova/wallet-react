const {Router} = require("express");
const errorHandler = require("../utils/errorHandler");
const ProfitType = require('../models/ProfitType');
const Icon = require('../models/Icon');
const auth = require("../middleware/auth.js");

const profitTypeRouter = Router();

profitTypeRouter.put(
    '/update/:id',
    async (request, response) => {
        try {
            const {id} = request.params;
            const {body} = request;
            const profitType = await ProfitType.findOneAndUpdate(
                {_id: id},
                {$set: {...body}},
                {new: true}
            );
            response.status(200).json(profitType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitTypeRouter.delete(
    '/delete/:id',
    async (request, response) => {
        try {
            const profitType = await ProfitType.findOne({_id: request.params.id});
            await Icon.findOneAndUpdate(
                {icon: profitType.icon},
                {$set: {icon: profitType.icon, isUsed: false}},
                {returnOriginal: false}
            );
            await ProfitType.deleteOne({_id: request.params.id});
            response.status(200).json({
                message: 'This profit was deleted'
            });
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitTypeRouter.post(
    '/add',
    auth,
    async (request, response) => {
        try {
            const {name, icon} = request.body;
            const profitType = await new ProfitType({
                name, icon, isPublic: true
            });
            profitType.save();
            await Icon.findOneAndUpdate(
                {icon},
                {$set: {icon, isUsed: true}},
                {returnOriginal: false},
            );
            response.status(201).json(profitType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitTypeRouter.get(
    '/:id',
    async (request, response) => {
        try {
            const profitType = await ProfitType.findById({_id: request.params.id});
            response.status(200).json(profitType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

profitTypeRouter.get(
    '/',
    async (request, response) => {
        try {
            const profits = await ProfitType.find({});
            response.status(200).json(profits);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = profitTypeRouter;
