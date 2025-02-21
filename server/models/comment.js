import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
    },
    owner: {
        type: String
    },
    postId: {
        type: String
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;