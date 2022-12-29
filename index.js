const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
app.use(
    cookieSession({ name: "session", keys: ["dshparko"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth", authRoute);

//
// const start = async () => {
//     try {
//         mongoose.set('strictQuery', true);
//         mongoose.connect(config.get('bdUrl'), {
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         })
//
//
//
//
//         app.listen(5000, () => {
//             console.log('Server is running on port', 5000);
//             console.log(`http://localhost:5000`);
//         })
//     } catch (error) {
//
//     }
// }
//
// start();
app.listen("5000", () => {
    console.log("Server is running!");
});
