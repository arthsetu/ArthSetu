const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET /bills — show all bills
router.get('/bills', isLoggedIn, async (req, res) => {
    try {
        const bills = await Bill.find({ 
            createdBy: req.session.user.id 
        }).sort({ createdAt: -1 });

        res.render('pages/bills', {
            user: req.session.user,
            bills
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /bills — create new bill
router.post('/bills', isLoggedIn, async (req, res) => {
    try {
        const { title, totalAmount, memberNames } = req.body;

        // memberNames comes as array of names from form
        // Convert to array if only one person entered
        const names = Array.isArray(memberNames) ? memberNames : [memberNames];

        // Filter out empty names
        const filteredNames = names.filter(name => name.trim() !== '');

        // Calculate equal split
        const share = Math.ceil(totalAmount / filteredNames.length);

        // Build members array
        const members = filteredNames.map(name => ({
            name: name.trim(),
            share,
            paid: false
        }));

        const newBill = new Bill({
            createdBy: req.session.user.id,
            title,
            totalAmount,
            members
        });

        await newBill.save();
        res.redirect('/bills');

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /bills/:billId/member/:memberId/toggle — mark paid/unpaid
router.post('/bills/:billId/member/:memberId/toggle', isLoggedIn, async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.billId);
        const member = bill.members.id(req.params.memberId);

        // Toggle paid status
        member.paid = !member.paid;
        await bill.save();

        res.redirect('/bills');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

// POST /bills/:id/delete — delete a bill
router.post('/bills/:id/delete', isLoggedIn, async (req, res) => {
    try {
        await Bill.findByIdAndDelete(req.params.id);
        res.redirect('/bills');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});

module.exports = router;