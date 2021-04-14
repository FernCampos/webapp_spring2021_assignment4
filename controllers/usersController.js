const User = require("../models/user")
const passport = require("passport");
const Post = require("../models/post");

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

var usersposts = [];

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
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Login Failed! Check your email or password!",
        successRedirect: "/home",
        successFlash: "Logged in!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
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
        if (req.skip) return next();
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", "User account successfully created!");
                res.locals.redirect = "/users";
                next();
            }
            else {
                req.flash("error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "/signup";
                next();
            }
        });
    },
    validate: (req, res, next) => {
        req.check("fname", "You must enter a first name").notEmpty();
        req.check("lname", "you must enter a last name").notEmpty();
        req.check("dob_month", "you must have a month in DOB").notEmpty();
        req.check("dob_day", "you must have a day in DOB").notEmpty();
        req.check("dob_year", "you must have a year in DOB").notEmpty();
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check("email", "email is not valid").isEmail();
        req.check("email", "email cannot be empty").notEmpty();
        req.check("password", "password cannot be empty").notEmpty();
        req.check("password", "your password must include at least one capital letter, one lower case letter, and one number").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{3,}$/);
        req.check("conf_password", "confirmed password cannot be empty").notEmpty();
        req.check("password", "password and confirmed password do not match").equals(req.body.conf_password);
        req.check("security_question", "security question must be selected").notEmpty();
        req.check("security_answer", "security answer must be filled out").notEmpty();


        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/signup";
                next();
            }
            else next();
        });
    },
    showHomepage: (req, res) => {
        res.render("home")
    },
    showCurrentUser: (req, res, next) => {
        if (res.locals.loggedIn) {
            let currentUserId = res.locals.currentUser._id;
            User.findById(currentUserId)
                .then(user => {
                    Post.find({ author: currentUserId })
                        .then(posts => {
                            res.locals.user = user;
                            res.locals.usersposts = posts;
                            next();
                        })
                        .catch(error => {
                            console.log(`Error retrieving posts: ${error.message}`);
                        });
                })
                .catch(error => {
                    console.log(`Error fetching user by ID: ${error.message}`);
                    next(error);
                });
        }
        else {
            next();
        }
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                Post.find({ author: userId })
                    .then(posts => {
                        res.locals.user = user;
                        res.locals.usersposts = posts;
                        next();
                    })
                    .catch(error => {
                        console.log(`Error retrieving posts: ${error.message}`);
                    });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let dob = req.body.dob_month + "/" + req.body.dob_day + "/" + req.body.dob_year;
        let loggedUser = res.locals.currentUser;
        if (loggedUser._id.equals(userId)) {
            User.findByIdAndUpdate(userId,
                {
                    $set:
                    {
                        'name.first': req.body.fname,
                        'name.last': req.body.lname,
                        dateOfBirth: dob,
                        userName: req.body.username,
                        email: req.body.email,
                        location: req.body.location,
                        description: req.body.bio
                    }
                })
                .then(user => {
                    res.locals.user = user;
                    res.locals.redirect = "/home";
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching user by ID: ${error.message}`);
                    next(error);
                });
        }
        else {
            req.flash("error", "You can only edit your own account!");
            res.locals.redirect = "/home";
            next();
        }
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        let loggedUser = res.locals.currentUser;
        if (loggedUser._id.equals(userId)) {
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
        else {
            req.flash("error", "You can only delete your own account!");
            res.locals.redirect = "/home";
            next();
        }
    }
}

