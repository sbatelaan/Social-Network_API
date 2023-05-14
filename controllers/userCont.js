const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
        .populate('thoughts')
        .then((users) => res.json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'all user error', err });
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((user) => {
            if (!user) {
                return res.status(404).json({message: 'No user found'})
            } else
            res.json(user)
        }).catch((err) => res.status(500).json(err))
    },

    //got an error saying MongooseError: Model.findOneAndUpdate() no longer accepts a callback
    //replaced with promise chain
    createUser(req, res) {
        User.create({
            username: req.body.username,
            email: req.body.email
        })
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, {
            username: req.body.username,
            email: req.body.email
        }, { new: true })
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(500).json({ message: 'update user error' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'update user error', err });
            });
    },
    //fondOneAndUpdate no longer accepts callback functions as the last argument

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user to delete'})
        : Thought.deleteMany({ username: user.username })
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({ message: 'No thoughts for user' })
        : res.json(user)
        )
        )
        .catch((err) => res.status(500).json(err))
    },

    addFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
          .select('username')
          .then(({ username }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $addToSet: { friends: { friendId: params.friendId, username } } },
              { new: true, runValidators: true }
            ).populate('friends');
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user with this id" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },

      removeFriend(req, res) {
        User.findOne({ _id: req.params.friendId })
          .select('-__v')
          .then((user) => {
            return User.findOneAndUpdate (
              { _id: req.params.userId }, 
              { $pull: { 
                  friends: { friendId: user._id }
                }
              },
              { new: true } 
            );
          })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
          })
          .catch((err) => res.status(500).json(err));
      }};
