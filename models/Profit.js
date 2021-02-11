const {Schema, model} = require('mongoose');

export const profitScheme = new Schema({
    profitType: {
        ref: 'ProfitType',
        type: Schema.Types.ObjectId
    },
    cost: {
        type: Number,
        required: true
    },
    wallet: {
        ref: 'Wallet',
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    }

}, {versionKey: false});

module.exports = model('Profit', profitScheme);