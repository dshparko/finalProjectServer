const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";


const {validationResult} = require("express-validator")
const Post = require('../models/Post')


router.post('/send',

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {
                reviewTitle, workTitle, text, teg, group, starCount
            }          = req.body



            const message = new Post({ reviewTitle, workTitle, text, teg, group, starCount})
            await message.save()
            res.json({message: "Message sent"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router