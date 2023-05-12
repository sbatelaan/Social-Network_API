const { Thought, User } = require('../models');

module.exports  = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
       
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('__v')
        .populate('reactions')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
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
                username: req.body.username
            },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated ${result}`)
                } else {
                    console.log(err);
                    res.status(500).json({ message: 'update thought error', err});

                }
            }
        )
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought to delete'})
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            )
        )
        .then((user) =>
        !user ? res.status(404).json({
             message: 'Errpr deleting thought'
        })
        : res.json({ message: 'Thought deleted '})
        )
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought ? res.status(404).json({ message: 'No thought with ID' })
        : res.json(`Reaction updated`)
        ).catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought ? res.status(404).json({ messsage: 'No thought with ID'})
        : res.json('Reaction deleted')
        )
        .catch((err) => res.status(500).json(err));
    },
};