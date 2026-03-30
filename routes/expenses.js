const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const isLoggedIn = require('../middleware/isLoggedIn');


router.get('/expenses',isLoggedIn, async (req, res) => {
    try {
        const userId = req.session.user.id;

       
        const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

        
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const categoryTotals = {};
        expenses.forEach(exp => {
            if (categoryTotals[exp.category]) {
                categoryTotals[exp.category] += exp.amount;
            } else {
                categoryTotals[exp.category] = exp.amount;
            }
        });

        res.render('pages/expenses', {
            expenses,
            total,
            categoryTotals,
            user: req.session.user
        });

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

router.post('/expenses', isLoggedIn, async (req, res) => {
    try {
        const { title, amount, category, note } = req.body;

        const newExpense = new Expense({
            user: req.session.user.id,  
            title,
            amount,
            category,
            note
        });

        await newExpense.save();
        res.redirect('/expenses');

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});


router.post('/expenses/:id/delete', isLoggedIn, async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.redirect('/expenses');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

module.exports = router;