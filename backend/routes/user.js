const express = require('express');
const { User, Account } = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddelware } = require('../middleware')
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const signUpBody = z.object({
    username: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().max(50),
    lastName: z.string().max(50)
})

const signInBody = z.object({
    username: z.string().email(),
    password: z.string()
})

const updateUserDetailsBody = z.object({
    password: z.string().min(8).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);   
        const { success } = signUpBody.safeParse(req.body);

        console.log(success);

        if(!success){
            return res.status(411).json({
                message: "Incorrect Inputs"
            })
        }

        const existingUser = await User.findOne({
            username: req.body.username
        })
        console.log('existingUser: ', existingUser);
        if(existingUser){
            return res.status(411).json({
                message: 'Email already taken'
            })
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })

        // const amount = Math.floor(Math.random() * 10000) + 1;

        // await Account.updateOne({balance: amount});

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() + 10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.status(200).json({
            message: "User created Successfully",
            token: token
        })
    } catch (err){
        console.error(err);
        res.status(500).json({
            message: err
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { success } = signInBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: 'Incorrect Inputs'
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        })

        if(user){
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)
    
            return res.status(200).json({
                token: token,
                firstName: user.firstName,
                lastName: user.lastName
            })
        } else {
            return res.status(400).json({
                message: 'Invalid username/ password'
            })
        }
    
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: err
        })
    }
})

router.put('/', authMiddelware, async (req, res) => {
    try {
        const { success } = updateUserDetailsBody.safeParse(req.body);

        if(!success) {
            res.status(411).json({
                message: `Error while updating the User details ${success.error}`
            })
        }
        
        await User.updateOne({_id: req.userId}, req.body);
        
        res.status(200).json({
            message: "User details updated Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "User details not updated successfully",
            error: error
        })
    }
})

router.get('/bulk', authMiddelware, async(req, res) => {
    try {
        const filter = req.query.filter || ""

        const regex = new RegExp(filter, 'i')

        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": regex
                },
            },
            {
                lastName: {
                    "$regex": regex
                }
            }]
        })


        if(users.length == 0) {
            return res.status(404).json({
                message: `No user matching this ${filter}`
            })
        }        

        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
        

    } catch(error){
        console.error("Error: ", error);
        res.status(500).json({
            message: error
        })

    }
})


module.exports = router;