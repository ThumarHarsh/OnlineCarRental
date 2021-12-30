const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
router.get("/", (req, res) => {
    res.send("Hello world from the router file of auth");
});

router.post("/reg", async (req, res) => {
    const { name, email, address, password, phone, city, state, dob } = req.body;
    if (!name || !email || !address || !phone || !password || !city || !state || !dob) {
        return res.status(422).json({ error: "Invalid " });
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });

        }
        const user = new User({ name, email, address, password, phone, city, state, dob });

        await user.save();

        res.status(201).json({ message: "user registered sucessfully" });
    } catch (err) {
        console.log(err);
    }

});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Your data is empty" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                const token = await userLogin.generateAuthToken(userLogin);
                res.cookie("jwtoken", token);
                res.json({ message: "Successfully logged in" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/userprofile', authenticate, (req, res) => {
    // console.log("User profile");
    res.send(req.rootUser);
});

module.exports = router;