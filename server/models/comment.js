import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postId: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;