const express = require("express"), app = express(),
homeController = require("./controllers/homeController"),
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts"),
methodOverride = require("method-override"),
router = express.Router(),
mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/twezzy",
    { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
router.use(layouts);

router.use(express.static("public"));

router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
router.use(express.json());

router.get("/", homeController.showIndex);

router.get("/signup", usersController.showSignup);
router.post("/signingUp", usersController.signingUp);

router.get("/login", usersController.showLogin);
router.post("/loginuser", usersController.loginUser);

router.get("/feed", homeController.showFeed);
router.get("/home", homeController.showHomepage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/:id", usersController.show, usersController.showView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), ()=>{
    console.log(`Server is running on port: ${app.get("port")}`)
})
