const { Schema, model } = require('mongoose');


const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(email) {
                  // Regular expression to validate email addresses
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(email);
                },
                message: 'Please enter a valid email address'
              }
        }
    }
)