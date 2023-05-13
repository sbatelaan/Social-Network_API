const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            max_length: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date),
        }
    }, {
        toJSON: {
            getters: true
        },
        id: false
    }
);
const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;