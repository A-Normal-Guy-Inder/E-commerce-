const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const { COOKIE_NAME, setOptions, clearOptions } = require("../config/auth-cookie");
const { verifyToken } = require("../middleware/auth-middleware");
const router = express.Router();

router.post("/register", async (req, res) => {
    let model = req.body;
    if (model.name && model.email && model.password) {
        await registerUser(model);
        res.send({ message: "User Registered", });
    }
    else {
        res.status(400).json({
            error: "Please provide name, email and password."
        });
    }
});

router.post("/login", async (req, res) => {
    let model = req.body;
    if (model.email && model.password) {
        const result = await loginUser(model);
        if (result) {
            /*
             * The token goes out only as an httpOnly cookie. It is deliberately
             * absent from the body so no browser script can read or store it.
             */
            res.cookie(COOKIE_NAME, result.token, setOptions());
            return res.send({ user: result.user });
        }
        else {
            res.status(400).json({
                error: "Invalid email and password."
            });
        }
    }
    else {
        res.status(400).json({
            error: "Please provide email and password."
        });
    }
});

/* The client cannot read the cookie, so it asks who it is signed in as */
router.get("/me", verifyToken, (req, res) => {
    res.send({
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin === true,
        }
    });
});

router.post("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME, clearOptions());
    res.send({ message: "Logged out" });
});

router.get("/contact-us", async (req, res) => {
    try {
        const contacts = await require('../handlers/contact_us-handler').getAllContacts();
        res.send(contacts);
    } catch (error) {
        res.status(500).send({ error: "Failed to retrieve contact requests." });
    }
});

module.exports = router;
