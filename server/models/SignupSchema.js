const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');

const signupSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

signupSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();

})

signupSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token})
        await this.save();
        return token;


    } catch (err) {
        console.log(err);
    }
}
module.exports = mongoose.model('users', signupSchema);