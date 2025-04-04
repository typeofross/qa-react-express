import Post from '#root/models/post.js';
import Comment from '#root/models/comment.js';

export default {
    get: {
        one(id) {
            return Post.findById(id)
                .populate('owner', 'username')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        select: 'username',
                    }
                })
        },
        latest() {
            return Post.find()
                .limit(10)
                .sort({ createdAt: -1 })
                .populate('owner', 'username')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        select: 'username',
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
        },
        catalog() {
            return Post.aggregate([
                {
                    $group: {
                        _id: { $toLower: "$category" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
        },
        category(name, number, limit) {

            const page = parseInt(number) || 1;
            return Post.find({ category: new RegExp(`^${name}$`, 'i') })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate('owner', 'username')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        select: 'username',
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
        },
        postCount(name) {
            return Post.countDocuments({ category: new RegExp(`^${name}$`, 'i') });
        },
        search(text) {
            return Post.find({
                $or: [
                    { title: new RegExp(`${text}`, 'i') },
                    { body: new RegExp(`${text}`, 'i') },
                ]
            })
                .sort({ createdAt: -1 })
                .populate('owner', 'username')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'owner',
                        select: 'username',
                    },
                    options: {
                        sort: { createdAt: -1 }
                    }
                })
        },
    },
    profile: {
        posts(userId) {
            return Post.find({ owner: userId })
                .sort({ createdAt: -1 })
        },
        comments(userId) {
            return Comment.find({ owner: userId })
                .populate('postId', 'title')
                .sort({ createdAt: -1 })
        },
        rated(userId) {
            return Post.find(
                {
                    $or: [
                        { likes: { $in: [userId] } },
                        { dislikes: { $in: [userId] } }
                    ]
                }
            )
                .sort({ createdAt: -1 })
        }
    }
}