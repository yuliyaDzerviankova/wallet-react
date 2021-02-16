const {Schema, model} = require('mongoose');

const walletScheme = new Schema({
    walletType: {
        ref: 'WalletType',
        type: Schema.Types.ObjectId,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    start_balance: {
        type: Number,
        default: 0,
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    balance: {
        type: Number,
        default: 0
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    profits_cost: {
        type: Number,
        default: 0
    },
    expenses_cost: {
        type: Number,
        default: 0
    },
    profits: [{type: Schema.Types.ObjectId, ref: 'Profit'}],
    expenses: [{type: Schema.Types.ObjectId, ref: 'Expense'}]
}, {versionKey: false});

module.exports = model('Wallet', walletScheme);