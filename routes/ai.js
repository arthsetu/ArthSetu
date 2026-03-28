// const express = require('express');
// const router = express.Router();
// const Expense = require('../models/Expense');
// const isLoggedIn = require('../middleware/isLoggedIn');
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// // GET /ai-advisor — show the page
// router.get('/ai-advisor', isLoggedIn, async (req, res) => {
//     try {
//         const expenses = await Expense.find({ 
//             user: req.session.user.id 
//         }).sort({ date: -1 }).limit(50);

//         res.render('pages/ai-advisor', {
//             user: req.session.user,
//             expenses,
//             advice: null,
//             loading: false
//         });
//     } catch (err) {
//         console.log(err);
//         res.send('Something went wrong!');
//     }
// });

// // POST /ai-advisor — get AI advice
// router.post('/ai-advisor', isLoggedIn, async (req, res) => {
//     try {
//         const expenses = await Expense.find({ 
//             user: req.session.user.id 
//         }).sort({ date: -1 }).limit(50);

//         if (expenses.length === 0) {
//             return res.render('pages/ai-advisor', {
//                 user: req.session.user,
//                 expenses,
//                 advice: 'Please add some expenses first!',
//                 loading: false
//             });
//         }

//         const total = expenses.reduce((sum, e) => sum + e.amount, 0);

//         const categoryTotals = {};
//         expenses.forEach(exp => {
//             categoryTotals[exp.category] = 
//                 (categoryTotals[exp.category] || 0) + exp.amount;
//         });

//         const prompt = `
// You are a friendly financial advisor for college students in India.
// Student name: ${req.session.user.name}
// Total Spent: ₹${total}
// Transactions: ${expenses.length}
// Spending by Category:
// ${Object.entries(categoryTotals)
//     .map(([cat, amt]) => `- ${cat}: ₹${amt} (${((amt/total)*100).toFixed(1)}%)`)
//     .join('\n')}
// Recent Expenses:
// ${expenses.slice(0, 10)
//     .map(e => `- ${e.title}: ₹${e.amount} (${e.category})`)
//     .join('\n')}
// Give:
// 1. Brief analysis of spending (2-3 sentences)
// 2. Top 3 specific saving tips based on their data
// 3. One motivational message
// Keep it friendly, use emojis, under 300 words.
//         `;

//         // ✅ Gemini call is INSIDE the route function
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         const model = genAI.getGenerativeModel({ 
//             model: 'gemini-1.5-flash',
//             generationConfig: {
//                 maxOutputTokens: 500,
//             }
//         });
//         const result = await model.generateContent(prompt);
//         const advice = result.response.text();

//         res.render('pages/ai-advisor', {
//             user: req.session.user,
//             expenses,
//             advice,
//             loading: false,
//             total,
//             categoryTotals
//         });

//     } catch (err) {
//         console.log(err);
//         res.render('pages/ai-advisor', {
//             user: req.session.user,
//             expenses: [],
//             advice: 'Sorry, AI advisor is temporarily unavailable. Please try again!',
//             loading: false
//         });
//     }
// });

// module.exports = router;