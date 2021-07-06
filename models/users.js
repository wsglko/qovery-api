const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    fullName: {
        type: String
    },
    createdOn: {
        type: String
    },
    updateOn: {
        type: String
    },
    baseLocation: {
        type: String
    }
})
const User = new mongoose.model("users", userSchema)
module.exports = User