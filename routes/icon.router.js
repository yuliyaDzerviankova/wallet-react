const {Router} = require("express");
const {errorHandler} = require("../utils/errorHandler");
const Icon = require('../models/Icon');

const iconRouter = Router();

iconRouter.put(
    '/update',
    async (request, response) => {
        try {
            const {icon, isUsed} = request.body;
            const iconUpdate = await Icon.findOneAndUpdate(
                {icon},
                {$set: {icon, isUsed}},
                {returnOriginal: false},
            );
            response.status(200).json(iconUpdate);
        } catch (e) {
            errorHandler(response, e);
        }

    });

iconRouter.get(
    '/',
    async (request, response) => {
        try {
            const icons = await Icon.find({isUsed: false});
            response.status(200).json(icons);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = iconRouter;
