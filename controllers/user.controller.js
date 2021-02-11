import mongoose from "mongoose";
import {userScheme} from "../models/User.js";
import bcrypt from 'bcryptjs';
import {SALT} from "../app.js";
import {errorHandler} from "../utils/errorHandler.js";
import {walletScheme} from "../models/Wallet.js";
import {walletTypeScheme} from "../models/WalletType.js";

const User = mongoose.model("User", userScheme);
const Wallet = mongoose.model("Wallet", walletScheme);
const WalletType = mongoose.model("WalletType", walletTypeScheme);

export const addUser = (request, response) => {

    if (!request.body) return response.sendStatus(400);

    const {name, email, password} = request.body;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    const user = new User({name, email, password: hashedPassword});

    user.save(error => {
        if (error) return response.send(error);
        response.send(user);
    })
}

export const updateUser = (request, response) => {
    if (!request.params) return response.sendStatus(400);

    const {id} = request.params;
    const {body} = request;
    User.findByIdAndUpdate(
        {_id: id},
        {$set: {...body}},
        {returnOriginal: false},
        (error, result) => {
            console.log(result);
            if (error) return console.log(error);
            response.send(result);
        });
}
