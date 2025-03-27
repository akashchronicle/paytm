const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Account = require('../Model/bank');
const { authMiddlewareCheck } = require('../authMiddleware/middleware');
const { User } = require('../Model/userSchema'); // Ensure this path is correct
router.get('/balance', authMiddlewareCheck, async (req, res) => {
    const account = await Account.findOne({
                userId: req.userId
            });
            const user = await User.findById(req.userId).select('firstName');

            res.json({
                firstName: user.firstName,
                balance: account.balance
            })
});

router.post('/transfer',authMiddlewareCheck,async(req,res)=>{
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

     await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });

})

module.exports = router;
