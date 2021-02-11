import mongoose from "mongoose";
import {walletTypeScheme} from "../models/WalletType.js";
import {errorHandler} from "../utils/errorHandler.js";

const WalletType = mongoose.model('WalletType', walletTypeScheme);

export const addWalletType = async (request, response) => {
    try {
        const {name} = request.body;
        const walletType = await new WalletType({name});
        walletType.save();
        response.status(201).json(walletType);
    } catch (e) {
        errorHandler(response, e);
    }
};
