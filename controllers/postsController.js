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
    }
}