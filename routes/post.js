const Router = require('express')
const router = new Router()

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
                userName, time, reviewTitle, workTitle, text, teg, group, starCount, imgUrl
            }          = req.body



            const message = new Post({workStars,userName, time, reviewTitle, workTitle, text, teg, group, starCount,imgUrl})
            await message.save()
            res.json({message: "Message sent"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })