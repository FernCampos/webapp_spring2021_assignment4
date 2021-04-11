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
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Login Failed! Check your email or password!",
        successRedirect: "/",
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
                // Find each post by the user by iterating over the posts array
                for(let i = 0; i < user.posts.length; i++){
                    // search for the posts by ID with a promise chain
                    Post.findById(user.posts[i])
                    .then(post => {
                        console.log(post.text);
                    })
                    .catch(error => {
                        console.log(`Error getting post: ${error.message}`);
                    })
                }
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
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
        .then(user => {
            res.render("users/edit", {user: user});
        })
        .catch(error => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
        });
    },
    update: (req, res, next) => {
        let userId = req.params.id;
        let dob = req.body.dob_month + "/" + req.body.dob_day + "/" + req.body.dob_year;
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

