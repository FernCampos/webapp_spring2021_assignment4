const User = require("../models/user")

var errors = [];

var loginError = {
    description: "Email or password is incorrect!"
};

var includeChars = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/;

module.exports = {
    index: (req, res, next) => {
        User.find()
        .then(users=>{
            res.locals.users = users;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching user data: ${error.message}`);
            next(error);
        });
    },
    indexView: (req, res) =>{
        res.render("users/index");
    },
    showSignup: (req, res) => {
        res.render("signup");
    },
    showLogin: (req, res) => {
        res.render("login")
    },
    loginUser: (req, res) => {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user && user.password === req.body.password) {
                    console.log("Logged in successfully!");
                    res.render("index");
                }
                else {
                    console.log("Email or password is incorrect");
                    res.render("login", { loginMessage: loginError });
                }
            })
            .catch(error => {
                console.log("Error logging in user");
                next(error);
            });
    },
    signingUp: (req, res) => {
        let noError = true;
        let dob = req.body.dob_month + "/" + req.body.dob_day + "/" + req.body.dob_year;
        let newUser = new User({
            firstName: req.body.fname,
            lastName: req.body.lname,
            dateOfBirth: dob,
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
            securityQuestion: req.body.security_question,
            securityAnswer: req.body.security_answer,
            gender: req.body.gender,
            location: req.body.location,
            description: req.body.bio
        });
        if (req.body.fname === "") {
            errors.push({
                description: "You must enter in a first name"
            });
            noError = false;
        }
        if (req.body.lname === "") {
            errors.push({
                description: "You must enter in a last name"
            });
            noError = false;
        }
        if (dob === "") {
            errors.push({
                description: "You must enter in a date of birth"
            });
            noError = false;
        }
        if (req.body.username === "") {
            errors.push({
                description: "You must enter in a username"
            });
            noError = false;
        }
        if (req.body.email === "") {
            errors.push({
                description: "You must enter in an email"
            });
            noError = false;
        }
        if (req.body.password === "") {
            errors.push({
                description: "You must enter in a password"
            });
            noError = false;
        }
        if (req.body.conf_password === "") {
            errors.push({
                description: "You must confirm your password"
            });
            noError = false;
        }
        if (!includeChars.test(req.body.password)) {
            errors.push({
                description: "Password must include [a-z], [A-Z], and [0-9]"
            });
            noError = false;
        }
        if (req.body.password !== req.body.conf_password) {
            errors.push({
                description: "Password and password confirmation must match"
            });
            noError = false;
        }
        if (req.body.security_question === "") {
            errors.push({
                description: "You must choose a security question"
            });
            noError = false;
        }
        if (req.body.security_answer === "") {
            errors.push({
                description: "You must enter an answer for the security question"
            });
            noError = false;
        }
        if (noError) {
            newUser.save()
                .then(() => {
                    res.render("thanks");
                })
                .catch(error => { res.send(error) });
        }
        else {
            console.log("Errors found in sign up");
            res.render("signup", { errorMessages: errors });
            errors = [];
        }
    },
    show: (req, res, next) =>{
        let userId = req.params.id;
        User.findById(userId)
        .then(user=>{
            res.locals.user = user;
            next();
        })
        .catch(error=>{
            console.log(`Error fetching user by ID: ${error.message}`);
        });
    },
    showView: (req, res) =>{
        res.render("users/show");
    },
    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
        .then(() => {
            res.locals.redirect = "/users";
            next();
        })
        .catch(error=>{
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        })
    }
}

