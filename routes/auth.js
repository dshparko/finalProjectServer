const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://final-project-client-itra-cvbgp80wg-dshparko.vercel.app/";


const {validationResult} = require("express-validator")
const Post = require('../models/Post')
const Comment = require('../models/Comment')
router.get('/searchTag/:id',

    async (req, res) => {
        try {
            const message = await Post.find({'teg': req.params.id})

            console.log(message)
            res.json(message)
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })
router.get('/search/:id',

    async (req, res) => {
        try {
            const message = await Post.find({$text: {$search: req.params.id}})

            console.log(message)
            res.json(message)
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.get('/allTags',

    async (req, res) => {
        try {
            const message = await Post.find({})
            let arr = [];
            message.map((item) => item['teg'].map((item) => {
                if(!arr.includes(item))
                arr.push(item)
            }));

            res.json(arr)
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post('/sendComment',

    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {userName, time, text} = req.body


            const newComment = new Comment({userName, time, text})
            await newComment.save()
            res.json({message: "Message sent"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/allmessages',
    async (req, res) => {
        try {
            const message = await Post.find({})
            return res.json(message)


        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.patch(`/likepost/:id`,
    async (req, res) => {
        try {
            const post = await Post.findOne({"_id": req.params.id})
            const {username} = req.body
            if (post.likes.includes(username)) {
                post.likes = post.likes.filter((e) => e !== username)
                post.save()
                return res.status(204).json({message: "fisliked"})
            }
            post.likes.push(username)
            post.save()
            return res.status(204).json({message: "liked"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }

    })

router.get(`/allposts/:id`,
    async (req, res) => {
        try {
            console.log(req.params.id);
            const message = await Post.find({'userName': req.params.id})
            return res.json(message)


        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/send',

    async (req, res) => {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {
                userName, time, reviewTitle, workTitle, text, teg, group, starCount, imgUrl
            } = req.body


            const message = new Post({userName, time, reviewTitle, workTitle, text, teg, group, starCount, imgUrl})
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

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/github", passport.authenticate("github", {scope: ["profile"]}));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router