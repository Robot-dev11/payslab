const { Account } = require('../db');
const mongoose = require('mongoose')


module.exports = {
    getBalance: async (req, res) => {
        console.log('balance is fetching');
        try {
            const account = await Account.findOne({
                userId: req.userId
            })
            res.status(200).json({
                balance: account.balance
            })
    
        } catch (err) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        }
    },

    transfer: async (req, res) => {
        const session = await mongoose.startSession();
        
        session.startTransaction();
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, {new : true}).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, {new: true}).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });

    }
}