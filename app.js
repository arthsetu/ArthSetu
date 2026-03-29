require('dotenv').config({ silent: true });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const ejsMate = require('ejs-mate');

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
   store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const isLoggedIn = require('./middleware/isLoggedIn');

app.use(authRoutes);
app.use(expenseRoutes);

const billRoutes = require('./routes/bills');
app.use(billRoutes);
const goalRoutes = require('./routes/goals');
app.use(goalRoutes);
app.get('/loan', (req, res) => {
    res.render('pages/loan');
});
app.get('/sip', (req, res) => {
    res.render('pages/sip');
});
app.get('/tax', (req, res) => {
    res.render('pages/tax');
});
const eventRoutes = require('./routes/events');
app.use(eventRoutes);
app.get('/', (req, res) => res.render('pages/index'));
app.get('/about', (req, res) => res.render('pages/aboutUs'));
app.get('/services', (req, res) => res.render('pages/Services'));
app.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
        const Expense = require('./models/Expense');
        const userId = req.session.user.id;

        const expenses = await Expense.find({ user: userId });

       
        const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

      
        const categoryTotals = {};
        expenses.forEach(exp => {
            categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        });

        let highestCategory = 'None';
        let highestAmount = 0;
        Object.keys(categoryTotals).forEach(cat => {
            if (categoryTotals[cat] > highestAmount) {
                highestAmount = categoryTotals[cat];
                highestCategory = cat;
            }
        });

        res.render('pages/dashboard', {
            user: req.session.user,
            total,
            highestCategory,
            highestAmount,
            categoryTotals
        });

    } catch (err) {
        console.log(err);
        res.send('Something went wrong!');
    }
});
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`Message from ${name} (${email}): ${message}`);
    res.send(`
        <div style="text-align:center; padding: 100px; font-family: sans-serif;">
            <h2 style="color: #1a7a4a;"> Message Sent!</h2>
            <p>Thank you <strong>${name}</strong>, we'll get back to you within 24 hours.</p>
            <a href="/" style="background:#1a7a4a; color:white; padding:12px 30px; border-radius:25px; text-decoration:none;">
                Back to Home
            </a>
        </div>
    `);
});
async function main() {
await mongoose.connect(process.env.MONGODB_URI); console.log('MongoDB Connected!'); }
main().catch(err => console.log(err));


app.listen(3000, () => {
    console.log(' Server running on port 3000');
});


