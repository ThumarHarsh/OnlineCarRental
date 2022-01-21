const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, "ONLINECARRENTALPROJECTBYHARSHANDSHAIL");
        // const rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });
        const rootUser = await User.findOne({ "tokens.token": token });


        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("Unauthorized User");
        console.log(err);
    }
}

module.exports = Authenticate;