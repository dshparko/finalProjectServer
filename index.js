const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passportSetup = require("./passport");
const passport = require("passport");

const corsModdleware = require('./mw/middleware')
const config = require('config')
const authRoute = require("./routes/auth");

const postRoute = require("./routes/post");
const app = express();
app.use(
    cookieSession({ name: "session", keys: ["dshparko"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(corsModdleware);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "https://final-project-client-itra.vercel.app/",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth", authRoute);


const start = async () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(config.get('bdUrl'), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })




        app.listen( () => {
            console.log('Server is running on port', 5000);
        })
    } catch (error) {

    }
}

start();
// app.listen("5000", () => {
//     console.log("Server is running!");
// });
