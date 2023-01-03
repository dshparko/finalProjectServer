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