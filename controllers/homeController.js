module.exports = {
    showIndex: (req, res) => {
        res.render("index")
    },
    showFeed: (req, res) => {
        res.render("feed")
    },
    showHomepage: (req, res) => {
        res.render("home")
    }
}