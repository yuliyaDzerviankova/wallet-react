const {Schema, model} = require('mongoose');

const expenseScheme = new Schema({
    expenseType: {
        ref: 'ExpenseType',
        type: Schema.Types.ObjectId,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    wallet: {
        ref: 'Wallet',
        type: Schema.Types.ObjectId
    },
    note: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

module.exports = model('Expense', expenseScheme);