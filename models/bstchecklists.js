const mongoose = require("mongoose")
const bstchecklistSchema = new mongoose.Schema({
    bstName: {
        type: String
    },
    bstCity: {
        type:String
    },
    region: {
        type:String
    },
    pinCode: {
        type:Number
    },
    bstType: {
       type:String 
    },
    sitePurpose: {
        type:String
    },
    siteOwner: {
        type:String
    },
    sitePurposeSpecification: {
        type:String
    },
    colocatedVendorName: {
        type:String
    },
    upstreamBst: {
        type:String
    },
    tierClass: {
        type:String
    },
    siteAddress: {
        type: String
    },
    contactPerson: {
        type:String
    },
    contactNumber: {
        type:String
    },
    dateOfCommissioning: {
        type: String
    },
    localEngineerName: {
        type: String
    },
    localEngineerNo: {
        type: String
    },
    localElectricityBoard: {
        type: String
    },
    bsoContactNo: {
        type: String
    },
    landMark: {
        type: String
    },
    distanceFromNearestNOC: {
        type: String
    },
    accessBst24Hrs: {
        type: String
    },
    latt: {
        type: String
    },
    longs: {
        type: String
    },
    towerHeight: {
        type: Number
    },
    towerType: {
        type: String
    },
    towerClassification: {
        type: String
    },
    nearestAirport: {
        type: String
    },
    distanceFromAirport: {
        type: String
    },
    amslGround: {
        type: Number
    },
    buildingHeight: {
        type: Number
    },
    frequencyRange: {
        type: Number
    }
})
const Bstchecklist = new mongoose.model("bstchecklists", bstchecklistSchema)
module.exports = Bstchecklist