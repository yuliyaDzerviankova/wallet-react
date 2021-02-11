import mongoose from "mongoose";
import {profitTypeScheme} from "../models/ProfitType.js";
import {iconScheme} from "../models/Icon.js";
import {updateIcons} from "./icons.controller.js";
import {errorHandler} from "../utils/errorHandler.js";

const ProfitType = mongoose.model("ProfitType", profitTypeScheme);
const Icon = mongoose.model("Icon", iconScheme);

export const addProfitType = async (request, response) => {
    try {
        const {name, icon} = request.body;
        const profitType = await new ProfitType({
            name, icon
        }).save();
        const iconView = await Icon({icon, isUsed: true});
        updateIcons({body: iconView});
        response.status(201).json(profitType);
    } catch (e) {
        errorHandler(response, e);
    }
}

export const getProfitsType = (request, response) => {
    ProfitType.find({}, function (err, profitsType) {
        if (err) {
            console.log(err);
            return response.sendStatus(400);
        }
        response.send(profitsType);
    });
};

export const getProfitTypeById = (request, response) => {
    ProfitType.findById({_id: request.params.id}, function (err, profitType) {
        if (err) return console.log(err);
        response.send(profitType);
    });
};

export const updateProfitType = async (request, response) => {
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
}

export const deleteProfitType = async (request, response) => {
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
}
