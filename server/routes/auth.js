const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const Car = require("../model/carSchema");
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


router.post('/updateprofile', authenticate, async (req, res) => {
    const { _id, name, email, address, password, phone, city, state, dob } = req.body;
    let new_password = await bcrypt.hash(password, 12);
    try {
        await User.updateOne({ _id }, {
            $set: {
                name: name,
                email: email,
                address: address,
                password: new_password,
                phone: phone,
                city: city,
                state: state,
                dob: dob,
            }
        })

        return res.status(202).json({ message: "Updation sucessfull" });
    } catch (err) {
        console.log(err);
    }
})


router.get('/logout', (req, res) => {
    console.log("Logout Page");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User is Logged out");
});

router.post('/carreg', async (req, res) => {
    const { companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = req.body;
    console.log(companyname);
    if (!companyname || !carmodel || !carclass || !transmissiontype || !fueltype || !seatingcapacity || !carnumber || !priceperday) {
        return res.status(422).json({ error: "Invalid " });
    }
    try {
        const car = new Car({ companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday });
        await car.save();
        res.status(201).json({ message: "car registered sucessfully" });

    } catch (err) {
        console.log(err);
    }
});

router.post('/getallcar', async (req, res) => {
    try {
        const car = await Car.find({});
        res.send(car);
    } catch (err) {
        console.log(err);
    }
})

router.post("/carcall", async (req, res) => {
    const { id } = req.body;
    try {
        const car = await Car.findById(id);
        res.send(car);
    } catch (err) {
        console.log(err);
    }
})

router.post('/updatecar', async (req, res) => {
    const { _id, companyname, carmodel, carclass, transmissiontype, seatingcapacity, fueltype, carnumber, priceperday } = req.body;
    try {
        await Car.updateOne({ _id }, {
            $set: {
                companyname: companyname,
                carmodel: carmodel,
                carclass: carclass,
                transmissiontype: transmissiontype,
                seatingcapacity: seatingcapacity,
                fueltype: fueltype,
                carnumber: carnumber,
                priceperday: priceperday,
            }
        })
        return res.status(202).json({ message: "Updation sucessfull" });

    } catch (err) {
        console.log(err);
    }

})

router.post('/availcar', async (req, res) => {
    try {
        const car = await Car.find({ isbooked: false }).exec();
        if (car) {
            res.send(car);
        }
        else {
            return res.status(400).json({ message: "Car Not Found" });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;