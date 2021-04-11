const User = require("../models/user"),
Post = require("../models/post");

module.exports = {
    create: (req, res, next) => {
        let userId = req.params.id;
        let newPost = new Post({
            text: req.body.twezInput
        });
        Post.create(newPost)
        .then(course =>{
            // add post to user object
            User.findByIdAndUpdate(userId, {$push: {posts:course._id}})
            .then(user=>{
                console.log(user.posts);
            })
            .catch(error=>{
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
        })
        .catch(error => {
            console.log(`Error saving post: ${error.message}`);
        });
    },
    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error fetching post by ID: ${error.message}`);
                next(error);
            })
    },
    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }
}