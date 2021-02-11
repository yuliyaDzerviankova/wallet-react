const {Schema, model} = require('mongoose');

const expenseTypeScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = model('ExpenseType', expenseTypeScheme);