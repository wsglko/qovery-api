require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const port = 3000||5001
require("./db/office-connection")
const Bstchecklist = require("./models/bstchecklists")
const Image = require("./models/images")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res, next => {
    res.json({
      status:true,
      message:"Welcome"
    })
})

app.get('/api/bstchecklist', async (req, res, next) => {
    try {
        const docs = await Bstchecklist.find()
        res.json(docs)
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

app.get('/api/images', async (req, res, next) => {
  try {
    const docs = await Image.find()
    res.json(docs)
  } catch (err) {
    res.json(err)
  }
})

app.post('/api/newimage', async (req, res, next) => {
    let imgData = {
        "delUrl": req.body.delUrl,
        "viewUrl": req.body.viewUrl,
        "imgDate": req.body.imgDate,
        "imgCat": req.body.imgCat,
        "imgDetails": req.body.imgDetails,
        "updateBy":req.body.updateBy,
        "updateOn":req.body.updateOn
    }
    try {
        const addImageData = new Image(imgData)
        const added = await addImageData.save()
        res.json({
            status: true,
            id: added._id
        })

    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

app.post('/api/newchecklist', async (req, res) => {
    let data = {
        "bstName":req.body.bstName,
        "bstCity":req.body.bstCity,
        "region":req.body.region,
        "pinCode":req.body.pinCode,
        "bstType":req.body.bstType,
        "sitePurpose":req.body.sitePurpose,
        "siteOwner":req.body.siteOwner,
        "sitePurposeSpecification":req.body.sitePurposeSpecification,
        "colocatedVendorName":req.body.colocatedVendorName,
        "upstreamBst":req.body.upstreamBst,
        "tierClass":req.body.tierClass,
        "siteAddress":req.body.siteAddress,
        "contactPerson":req.body.contactPerson,
        "contactNumber":req.body.contactNumber,
        "dateOfCommissioning":req.body.dateOfCommissioning,
        "localEngineerName":req.body.localEngineerName,
        "localEngineerNo":req.body.localEngineerNo,
        "localElectricityBoard":req.body.localElectricityBoard,
        "bsoContactNo":req.body.bsoContactNo,
        "landMark":req.body.landMark,
        "distanceFromNearestNOC":req.body.distanceFromNearestNOC,
        "accessBst24Hrs":req.body.accessBst24Hrs,
        "latt":req.body.latt,
        "longs":req.body.longs,
        "towerHeight":req.body.towerHeight,
        "towerType":req.body.towerType,
        "towerClassification":req.body.towerClassification,
        "nearestAirport":req.body.nearestAirport,
        "distanceFromAirport":req.body.distanceFromAirport,
        "amslGround":req.body.amslGround,
        "buildingHeight":req.body.buildingHeight,
        "frequencyRange": req.body.frequencyRange
    }
    try {
        const addChecklistData = new Bstchecklist(data)
        const added = await addChecklistData.save()
        res.json({
            status: true,
            id: added._id
        })
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
})

app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`)
})
