const {Router} = require("express");
const WalletType = require("../models/WalletType");
const {errorHandler} = require("../utils/errorHandler");
const Icon = require('../models/Icon');

const walletTypeRouter = Router();

walletTypeRouter.post(
    '/add',
    async (request, response) => {
        try {
            const {name, icon} = request.body;
            const walletType = await new WalletType({name});
            walletType.save();
            const iconView = await new Icon({icon, isUsed: true});
            await Icon.findOneAndUpdate(
                {icon},
                {$set: {...iconView}},
                {returnOriginal: false},
            );
            response.status(201).json(walletType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = walletTypeRouter;
