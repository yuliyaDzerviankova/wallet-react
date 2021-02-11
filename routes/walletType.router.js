const {Router} = require("express");
const WalletType = require("../models/WalletType");
const {errorHandler} = require("../utils/errorHandler");

const walletTypeRouter = Router();

walletTypeRouter.post(
    '/add',
    async (request, response) => {
        try {
            const {name} = request.body;
            const walletType = await new WalletType({name});
            walletType.save();
            response.status(201).json(walletType);
        } catch (e) {
            errorHandler(response, e);
        }
    });

module.exports = walletTypeRouter;
