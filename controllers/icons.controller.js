import mongoose from "mongoose";
import {iconScheme} from "../models/Icon.js";
import {errorHandler} from "../utils/errorHandler.js";

const Icon = mongoose.model("Icon", iconScheme);

export const getIcons = async (request, response) => {
    try {
        const icons = await Icon.find({isUsed: false});
        response.status(200).json(icons);
    } catch (e) {
        errorHandler(response, e);
    }
}

export const updateIcons = (request, response) => {
    try {
        const {icon, isUsed} = request.body;
        Icon.findOneAndUpdate(
            {icon},
            {$set: {icon, isUsed}},
            {returnOriginal: false},
            (error, result) => {
                if (error) console.log(error);
                console.log(result);
            }
        );
    } catch (e) {
        errorHandler(response, e);
    }

};
