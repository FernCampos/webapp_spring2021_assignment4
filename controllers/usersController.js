const User = require("../models/user")
const passport = require("passport");

const getUserParams = body => {
    let dob = body.dob_month + "/" + body.dob_day + "/" + body.dob_year;
    return {
        name: {
            first: body.fname,
            last: body.lname
        },
        dateOfBirth: dob,
        userName: body.username,
        email: body.email,
        password: body.password,
        security: {
            securityQuestion: body.security_question,
            securityAnswer: body.security_answer
        },
        gender: body.gender,
        location: body.location,
        description: body.bio

    }
}

var errors = [];

var loginError = {
    description: "Email or password is incorrect!"
};

var includeChars = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/;

module.exports = {
    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user data: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
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
                    res.render("home");
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
    signingUp: (req, res, next) => {
        if(req.skip) return next();
        let newUser = new User(getUserParams(req.body));
        
        User.register(newUser, req.body.password, (error, user) => {
            if(user){
                req.flash("success", "User account successfully created!");
                res.locals.redirect = "/users";
                next();
            }
            else{
                req.flash("error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "/signup";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check("email", "email is not valid!").isEmail();
        req.check("password", "Password cannot be empty!").notEmpty();
        
        req.getValidationResult().then((error) =>{
            if(!error.isEmpty()){
                let messages = error.array().map(e=>e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/signup";
                next();
            }
            else next();
        });
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
            });
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    }
}

