const User = require("../models/user"),
    Post = require("../models/post");

module.exports = {
    create: (req, res, next) => {
        let userId = req.params.id;
        let newPost = new Post({
            text: req.body.twezInput,
            author: userId
        });
        let loggedUser = res.locals.currentUser;
        if (loggedUser._id.equals(userId)) {
            Post.create(newPost)
                .then(course => {
                    // add post to user object
                    User.findByIdAndUpdate(userId, { $push: { posts: course._id } })
                        .then(user => {
                            res.locals.redirect = "/home";
                            next();
                        })
                        .catch(error => {
                            console.log(`Error fetching user by ID: ${error.message}`);
                            next(error);
                        })
                })
                .catch(error => {
                    console.log(`Error saving post: ${error.message}`);
                });
        }
        else {
            req.flash("error", "You can only post from your own account!");
            res.locals.redirect = "/home";
            next();
        }
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        var item = undefined;
        // find the post by ID
        Post.findById(postId)
            .then(post => {
                // if the logged in user id is equal to the post author id, continue
                if (res.locals.currentUser._id.equals(post.author)) {
                    // find the post by ID and remove
                    Post.findByIdAndRemove(postId)
                        .then(() => {
                            User.findByIdAndUpdate(res.locals.currentUser._id,
                                { $pull: { posts: post._id } }
                            )
                                .then(user => {
                                    res.locals.redirect = "/home";
                                    next();
                                })
                                .catch(error => {
                                    console.log(`Error updating user posts: ${error.message}`);
                                })
                        })
                        .catch(error => {
                            console.log(`Error fetching post by ID: ${error.message}`);
                            next(error);
                        });
                }
                // else send a flash message notifying user they can only delete their own posts
                else {
                    req.flash("error", "You can only delete your own posts!");
                    res.locals.redirect = "/home";
                    next();
                }
            })
            .catch(error => {
                console.log(`Error finding post: ${error.message}`);
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }
}