"use strict";

const mongoose = require("mongoose"),
    User = require("./models/user");

mongoose.connect(
    "mongodb://localhost:27017/twezzy",
    { useNewUrlParser: true }
);

mongoose.connection;

var contacts = [
    {
        name: {
            first: "Fernando",
            last: "Campos"
        },
        dateOfBirth: "DOB",
        userName: "TheFernster",
        email: "fern@mail.com",
        password: "Thepassword123",
        security: {
            securityQuestion: "something",
            securityAnswer: "something",
        },
        gender: "Male",
        location: "USA",
        description: "Some guy that lives in a world"
    },
    {
        name: {
            first: "Jon",
            last: "Wexler"
        },
        dateOfBirth: "DOB",
        userName: "Wexlington",
        email: "jonwexler@mail.com",
        password: "Booktime55",
        security: {
            securityQuestion: "something",
            securityAnswer: "something",
        },
        gender: "Male",
        location: "USA",
        description: "Made a book to help make web apps"
    },
    {
        name: {
            first: "Felix",
            last: "Lengyel"
        },
        dateOfBirth: "DOB",
        userName: "xQcOW",
        email: "xqc@mail.com",
        password: "Dud73841",
        security: {
            securityQuestion: "something",
            securityAnswer: "something",
        },
        gender: "Male",
        location: "Canada",
        description: "A dud"
    },
    {
        name: {
            first: "Jennifer",
            last: "Lopez"
        },
        dateOfBirth: "DOB",
        userName: "JLO",
        email: "JLO@mail.com",
        password: "XYZxyz189",
        security: {
            securityQuestion: "something",
            securityAnswer: "something",
        },
        gender: "Female",
        location: "USA",
        description: "Singer in a world"
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty!");
    });

var commands = [];

contacts.forEach(c => {
    let newUser = new User(c);
    commands.push(
        User.register(newUser, c.password)
    );
});

Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });

