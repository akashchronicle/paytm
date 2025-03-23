const express = require('express');
const router = express.Router();
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

module.exports = router;
