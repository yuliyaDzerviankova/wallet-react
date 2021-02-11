const {Schema, model} = require('mongoose');

const userScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    wallets: [{type: Schema.Types.ObjectId, ref: 'Wallet'}]
}, {versionKey: false});

module.exports = model('User', userScheme);
