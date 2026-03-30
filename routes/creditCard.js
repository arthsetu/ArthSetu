const express = require("express");
const router = express.Router();

// FORM PAGE
router.get("/credit-card", (req, res) => {
    res.render("pages/credit/form");
});

// RESULT PAGE
router.post("/credit-card", (req, res) => {
    const { category } = req.body;

    // const cards = {
    //     fitness: [
    //         {
    //             name: "HDFC Wellness Card",
    //             benefits: "Gym cashback, health rewards",
    //             company: "HDFC Bank"
    //         }
    //     ],
    //     education: [
    //         {
    //             name: "SBI Student Plus Card",
    //             benefits: "Education EMI, cashback",
    //             company: "SBI"
    //         }
    //     ],
    //     agriculture: [
    //         {
    //             name: "Kisan Credit Card",
    //             benefits: "Low interest loans",
    //             company: "Govt + Banks"
    //         }
    //     ],
    //     media: [
    //         {
    //             name: "Amazon Pay ICICI Card",
    //             benefits: "OTT + shopping cashback",
    //             company: "Amazon + ICICI"
    //         }
    //     ],
    //     travel: [
    //         {
    //             name: "Axis Travel Card",
    //             benefits: "Air miles, lounge access",
    //             company: "Axis Bank"
    //         }
    //     ],
    //     finance: [
    //         {
    //             name: "ICICI Platinum Card",
    //             benefits: "Cashback + rewards",
    //             company: "ICICI Bank"
    //         }
    //     ]
    // };
     const cards = {
    travel: [
        {
            name: "Axis Travel Card",
            tagline: "Best for Frequent Travelers ✈️",
            benefits: [
                "Free airport lounge access",
                "5X reward points on travel",
                "Air miles conversion"
            ],
            annualFee: "₹999",
            cashback: "Up to 5%",
            eligibility: "Income > ₹3L/year",
            company: "Axis Bank"
        },
        {
            name: "HDFC Regalia",
            tagline: "Premium lifestyle card 💎",
            benefits: [
                "International lounge access",
                "Dining offers",
                "Flight vouchers"
            ],
            annualFee: "₹2500",
            cashback: "Up to 10%",
            eligibility: "Income > ₹5L/year",
            company: "HDFC Bank"
        }
    ],

    fitness: [
        {
            name: "HDFC Wellness Card",
            tagline: "Health + Fitness rewards 🏋️",
            benefits: [
                "Gym cashback",
                "Health insurance perks",
                "Pharmacy discounts"
            ],
            annualFee: "₹499",
            cashback: "3%",
            eligibility: "Income > ₹2L/year",
            company: "HDFC Bank"
        }
    ],

    education: [
        {
            name: "SBI Student Plus",
            tagline: "Best for students 🎓",
            benefits: [
                "Low interest EMI",
                "Bookstore cashback",
                "Zero joining fee"
            ],
            annualFee: "₹0",
            cashback: "2%",
            eligibility: "Student ID required",
            company: "SBI"
        }
    ],

    finance: [
        {
            name: "ICICI Platinum",
            tagline: "Everyday savings 💰",
            benefits: [
                "Fuel surcharge waiver",
                "Cashback on bills",
                "Reward points"
            ],
            annualFee: "₹500",
            cashback: "3%",
            eligibility: "Income > ₹2.5L/year",
            company: "ICICI"
        }
    ],

    media: [
        {
            name: "Amazon Pay ICICI",
            tagline: "Shopping + OTT 🎬",
            benefits: [
                "5% Amazon cashback",
                "Prime offers",
                "OTT discounts"
            ],
            annualFee: "₹0",
            cashback: "5%",
            eligibility: "Basic KYC",
            company: "Amazon + ICICI"
        }
    ],

    agriculture: [
        {
            name: "Kisan Credit Card",
            tagline: "For farmers 🌾",
            benefits: [
                "Low interest loans",
                "Govt subsidy",
                "Flexible repayment"
            ],
            annualFee: "₹0",
            cashback: "N/A",
            eligibility: "Farmer registration",
            company: "Govt + Banks"
        }
    ]
};
    const result = cards[category] || [];

    res.render("pages/credit/result", { result, category });
});

module.exports = router;