const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../Utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts')
                    .populate('following');
            
                return userData;
            }
        
            throw new AuthenticationError('Not logged in');
        },
        posts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params).sort({ createdAt: -1 });
        },

        postt: async (parent, { _id }) => {
            return Post.findOne({ _id });
        },
                // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('following')
            .populate('posts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('following')
            .populate('posts');
        }    
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
        
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
        
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
        
            const token = signToken(user);
            return { token, user };
        },
        addPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create({ ...args, username: context.user.username });
            
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );
            
                return post;
            }
        
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: { commentBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
            
                return updatedPost;
            }
        
            throw new AuthenticationError('You need to be logged in!');
        },
        Follow: async (parent, { followingId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { following: followingId } },
                    { new: true }
                ).populate('following');
            
                return updatedUser;
            }
        
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;