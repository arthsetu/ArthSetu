const express = require("express");
const router = express.Router();

// FORM PAGE
router.get("/credit-card", (req, res) => {
    res.render("pages/credit/form");
});

// RESULT PAGE
router.post("/credit-card", (req, res) => {
    const { category } = req.body;

    const cards = {
        fitness: [
            {
                name: "HDFC Wellness Card",
                benefits: "Gym cashback, health rewards",
                company: "HDFC Bank"
            }
        ],
        education: [
            {
                name: "SBI Student Plus Card",
                benefits: "Education EMI, cashback",
                company: "SBI"
            }
        ],
        agriculture: [
            {
                name: "Kisan Credit Card",
                benefits: "Low interest loans",
                company: "Govt + Banks"
            }
        ],
        media: [
            {
                name: "Amazon Pay ICICI Card",
                benefits: "OTT + shopping cashback",
                company: "Amazon + ICICI"
            }
        ],
        travel: [
            {
                name: "Axis Travel Card",
                benefits: "Air miles, lounge access",
                company: "Axis Bank"
            }
        ],
        finance: [
            {
                name: "ICICI Platinum Card",
                benefits: "Cashback + rewards",
                company: "ICICI Bank"
            }
        ]
    };

    const result = cards[category] || [];

    res.render("pages/credit/result", { result, category });
});

module.exports = router;