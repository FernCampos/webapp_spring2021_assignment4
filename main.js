const {cookie} = require("express-validator");
const passport = require("passport");

const express = require("express"), app = express(),
homeController = require("./controllers/homeController"),
usersController = require("./controllers/usersController"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts"),
methodOverride = require("method-override"),
router = express.Router(),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
User = require("./models/user"),
mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/twezzy",
    { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
router.use(express.static("public"));
router.use(layouts);

router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
router.use(express.json());

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.use((req, res, next) =>{
    res.locals.flashMessages = req.flash();
    //res.locals.loggedIn = req.isAuthenticated();
    //res.locals.currentUser = req.user;
    next();
});

router.use(expressValidator());

router.get("/", homeController.showIndex);

router.get("/signup", usersController.showSignup);
router.post("/signingUp", usersController.validate, usersController.signingUp, usersController.redirectView);

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
