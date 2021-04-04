const passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
userSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    security: {
        securityQuestion: {
            type: String,
            required: true
        },
        securityAnswer: {
            type: String,
            required: true
        }
    },
    gender: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
})

module.exports = mongoose.model("User", userSchema);