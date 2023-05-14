const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],


    friends: [
        {
          friendId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          username: {
            type: String,
            required: true
          }
        }
      ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;