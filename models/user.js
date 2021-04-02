const mongoose = require("mongoose"),
userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    userName: String,
    email: String, 
    password: String,
    securityQuestion: String,
    securityAnswer: String,
    gender: String,
    location: String,
    description: String
});

module.exports = mongoose.model("User", userSchema);