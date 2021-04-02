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
        firstName: "Fernando",
        lastName: "Campos",
        dateOfBirth: "DOB",
        userName: "TheFernster",
        email: "fern@mail.com",
        password: "Thepassword123",
        securityQuestion: "something",
        securityAnswer: "something",
        gender: "Male",
        location: "USA",
        description: "Some guy that lives in a world"
    },
    {
        firstName: "Jon",
        lastName: "Wexler",
        dateOfBirth: "DOB",
        userName: "Wexlington",
        email: "jonwexler@mail.com",
        password: "Booktime55",
        securityQuestion: "something",
        securityAnswer: "something",
        gender: "Male",
        location: "USA",
        description: "Made a book to help make web apps"
    },
    {
        firstName: "Felix",
        lastName: "Lengyel",
        dateOfBirth: "DOB",
        userName: "xQcOW",
        email: "xqc@mail.com",
        password: "Dud73841",
        securityQuestion: "something",
        securityAnswer: "something",
        gender: "Male",
        location: "Canada",
        description: "A dud"
    },
    {
        firstName: "Jennifer",
        lastName: "Lopez",
        dateOfBirth: "DOB",
        userName: "JLO",
        email: "JLO@mail.com",
        password: "XYZxyz189",
        securityQuestion: "something",
        securityAnswer: "something",
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
    commands.push(
        User.create({
            firstName: c.firstName,
            lastName: c.lastName,
            dateOfBirth: c.dateOfBirth,
            userName: c.userName,
            email: c.email,
            password: c.password,
            securityQuestion: c.securityQuestion,
            securityAnswer: c.securityAnswer,
            gender: c.gender,
            description: c.description
        })
    );
});

Promise.all(commands)
.then(r=>{
    console.log(JSON.stringify(r));
    mongoose.connection.close();
})
.catch(error=>{
    console.log(`ERROR: ${error}`);
});

