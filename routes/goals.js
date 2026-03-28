const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET /goals — show all goals
router.get('/goals', isLoggedIn, async (req, res) => {
    try {
        const goals = await Goal.find({ 
            user: req.session.user.id 
        }).sort({ createdAt: -1 });

        res.render('pages/goals', {
            user: req.session.user,
            goals
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /goals — create new goal
router.post('/goals', isLoggedIn, async (req, res) => {
    try {
        const { title, targetAmount, emoji, deadline } = req.body;

        const newGoal = new Goal({
            user: req.session.user.id,
            title,
            targetAmount,
            emoji: emoji || '🎯',
            deadline: deadline || null
        });

        await newGoal.save();
        res.redirect('/goals');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /goals/:id/add — add money to goal
router.post('/goals/:id/add', isLoggedIn, async (req, res) => {
    try {
        const { amount } = req.body;
        const goal = await Goal.findById(req.params.id);

        goal.savedAmount += parseFloat(amount);

        // Mark completed if target reached
        if (goal.savedAmount >= goal.targetAmount) {
            goal.savedAmount = goal.targetAmount;
            goal.completed = true;
        }

        await goal.save();
        res.redirect('/goals');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /goals/:id/delete — delete goal
router.post('/goals/:id/delete', isLoggedIn, async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.redirect('/goals');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

module.exports = router;