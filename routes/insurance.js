const express = require("express");
const router = express.Router();

// FORM PAGE
router.get("/insurance", (req, res) => {
    res.render("pages/insurance/form");
});

// RESULT PAGE
router.post("/insurance", (req, res) => {
    const { category } = req.body;

    const insurancePlans = {
        fitness: [
            {
                name: "Health Shield Plan",
                provider: "HDFC Ergo",
                benefits: ["Gym coverage", "Medical insurance", "Wellness rewards"]
            }
        ],
        education: [
            {
                name: "Student Secure Plan",
                provider: "LIC",
                benefits: ["Education coverage", "Loan protection", "Scholarship support"]
            }
        ],
        life: [
            {
                name: "Life Protect Plan",
                provider: "ICICI Prudential",
                benefits: ["Life cover", "Family support", "Long-term savings"]
            }
        ],
        travel: [
            {
                name: "Travel Safe Plan",
                provider: "TATA AIG",
                benefits: ["Trip cancellation", "Medical abroad", "Lost baggage"]
            }
        ],
        agriculture: [
            {
                name: "Kisan Suraksha Plan",
                provider: "Govt Scheme",
                benefits: ["Crop insurance", "Weather protection", "Subsidy benefits"]
            }
        ],
        entertainment: [
            {
                name: "Gadget Protect Plan",
                provider: "Bajaj Allianz",
                benefits: ["Device insurance", "Damage cover", "Theft protection"]
            }
        ],
        finance: [
            {
                name: "Income Protection Plan",
                provider: "Max Life",
                benefits: ["Income backup", "Emergency fund", "Disability cover"]
            }
        ]
    };

    const result = insurancePlans[category] || [];

    res.render("pages/insurance/result", { result, category });
});

module.exports = router;