const {Schema, model} = require('mongoose');

export const walletTypeScheme = new Schema({
    name: {
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = model('WalletType', walletTypeScheme);