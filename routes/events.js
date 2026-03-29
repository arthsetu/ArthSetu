const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET /events — show all events
router.get('/events', isLoggedIn, async (req, res) => {
    try {
        const events = await Event.find({
            user: req.session.user.id
        }).sort({ date: 1 });

        res.render('pages/events', {
            user: req.session.user,
            events
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /events — create new event
router.post('/events', isLoggedIn, async (req, res) => {
    try {
        const { name, type, totalBudget, attendees, date } = req.body;

        const newEvent = new Event({
            user: req.session.user.id,
            name,
            type,
            totalBudget,
            attendees,
            date
        });

        await newEvent.save();
        res.redirect('/events');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /events/:id/expense — add expense to event
router.post('/events/:id/expense', isLoggedIn, async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const event = await Event.findById(req.params.id);

        event.expenses.push({ title, amount: parseFloat(amount), category });
        await event.save();

        res.redirect('/events');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /events/:id/expense/:expId/delete — delete expense
router.post('/events/:id/expense/:expId/delete', isLoggedIn, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        event.expenses = event.expenses.filter(
            e => e._id.toString() !== req.params.expId
        );
        await event.save();
        res.redirect('/events');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /events/:id/delete — delete event
router.post('/events/:id/delete', isLoggedIn, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.redirect('/events');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

module.exports = router;