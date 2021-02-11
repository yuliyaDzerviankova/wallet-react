const {Schema, model} = require('mongoose');

export const iconScheme = new Schema({
    icon: {
        type: String,
        required: true
    },
    isUsed: {
        type: Boolean,
        required: true
    }
}, {versionKey: false});

module.exports = model('Icon', iconScheme);