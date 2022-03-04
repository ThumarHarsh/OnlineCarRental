const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");

const Adminauthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, "THISISANADMINPANELWHICHISONLYAUTHORIZEDBYADMINONLY");
        const adminUser = await Admin.findOne({ "tokens.token": token });

        if (!adminUser) {
            throw new Error("Admin not found");
        }
        req.token = token;
        req.adminUser = adminUser;
        req.adminID = adminUser._id;

        next();
    }
    catch (err) {
        res.status(401).send("Not Authorized");
        console.log(err);
    }
}

module.exports = Adminauthenticate;