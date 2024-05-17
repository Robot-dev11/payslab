const express = require('express')
const userRouter = require('./user');
const router = express.Router();
const accountRouter = require('./account');

router.get('/api/v1', (req, res, next) => {
    console.log("Router working");
})


router.use("/user", userRouter)
router.use("/account", accountRouter);


module.exports = router