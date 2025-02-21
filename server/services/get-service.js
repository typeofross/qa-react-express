import Post from '../models/post.js';

export default {
    get: {
        one(id) {
            return Post.findById(id).populate('comments');
        },
        latest() {
            return Post.find()
                .limit(10)
                .sort({ createdAt: -1 })
        },
        catalog() {
            return Post.aggregate([{
                $group: {
                    _id: { $toLower: "$category" },
                    count: { $sum: 1 }
                }
            }])
        },
        category(name, number) {

            const page = parseInt(number) || 1;
            const limit = 10;
            return Post.find({ category: new RegExp(`^${name}$`, 'i') })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
        }
    }
}