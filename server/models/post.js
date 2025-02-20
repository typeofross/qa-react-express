import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    owner: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dislike'
    }]
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

const Post = mongoose.model('post', postSchema);

export default Post;