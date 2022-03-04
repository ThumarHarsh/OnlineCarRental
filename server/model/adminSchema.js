const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ],
});

adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

adminSchema.methods.generateAuthToken = async (adminLogin) => {
    try {
        let token = jwt.sign({ _id: this._id }, "THISISANADMINPANELWHICHISONLYAUTHORIZEDBYADMINONLY");
        console.log(token);
        adminLogin.tokens = adminLogin.tokens.concat({ token: token });
        await adminLogin.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const Admin = mongoose.model("ADMIN", adminSchema);
module.exports = Admin;