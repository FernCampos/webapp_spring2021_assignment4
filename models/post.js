const User = require("./user");
const mongoose = require("mongoose"),
postSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Post", postSchema);