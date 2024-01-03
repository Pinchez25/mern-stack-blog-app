const {model, Schema} = require('mongoose');

const postSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Please provide a title']
        },
        description: {
            type: String,
            required: [true, 'Please provide a description']
        },
        content: {
            type: String,
            maxLength: [5000, 'Content cannot be more than 5000 characters'],
            required: [true, 'Please provide a body']
        },
        image: {
            type: String,
            required: [true, 'Please provide an image']
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {timestamps: true}
);

module.exports = model('Post', postSchema);
