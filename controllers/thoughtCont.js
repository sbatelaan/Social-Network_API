const { Thought, User } = require('../models');

module.exports  = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
       
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err); 
            return res.status(500).json(err);
          });
    },

    createThought(req, res) {
        Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        }).then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username }, {
                    $addToSet: { thoughts: thought._id }
                }, { new: true }
            );
        }).then((user) =>
        !user ? res.status(404).json({
            message: 'Connot creat thought, no user with that ID'
        })
        : res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          {
            thoughtText: req.body.thoughtText,
            username: req.body.username,
          },
          { new: true }
        )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thought);
            console.log(`Updated ${thought}`);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'update thought error', err });
          });
      },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought to delete' });
            }
            return User.findOne({ thoughts: req.params.thoughtId });
          })
          .then((user) => {
            if (user) {
              return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              );
            }
            return null;
          })
          .then((user) => {
            if (!user) {
              return res.status(404).json({ message: 'Error deleting thought' });
            }
            res.json({ message: 'Thought deleted' });
          })
          .catch((err) => res.status(500).json(err));
      },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true, runValidators: true }
        )
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought with this id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.json(err));
      },
    
      removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.json(err));
      },
    };