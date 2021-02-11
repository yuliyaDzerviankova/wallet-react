const {Schema, model} = require('mongoose');

export const profitTypeScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = model('ProfitType', profitTypeScheme);