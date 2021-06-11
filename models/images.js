const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    delUrl: {
        type:String
    },
    viewUrl: {
        type:String
    },
    imgDate: {
        type:String
    },
    imgCat: {
       type:String 
    },
    imgDetails: {
        type:String
    }
})
const Image = new mongoose.model("images", imageSchema)
module.exports = Image