require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt")
const port = process.env.PORT || 5001
require("./db/office-connection")
const Bstchecklist = require("./models/bstchecklists")
const Image = require("./models/images")
const User = require("./models/users")
const cps = require("./models/coloProviders")
const path = require("path")
//const moment = require("moment")
const jwt = require("jsonwebtoken")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static(__dirname+'/public'))
const users = []

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/register", (req, res) => {
    res.sendFile(path.join(__dirname+"/public/register.html"))
})

app.post("/users/register", async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.json({status:400,message:"Email already exists"})
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = new User({ email: req.body.email, password: hashedPassword,fullName:req.body.fullName,baseLocation:req.body.baseLocation,createdOn:new Date(), updateOn:new Date() })
    try {
        const add = await userData.save()
        res.json({
            status: true,
            id: add._id
        })
    } catch(err) {
        res.json({
            status: false,
            message: err
        })
    }
})

app.get("/users/login", (req, res) => {
    res.sendFile(path.join(__dirname+"/public/login.html"))
})

app.post("/users/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user === null) {
        return res.json({
            status: 400,
            message: "User not found"
        })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            //res.send("success")
            users.push(user)
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
            res.header('auth-token',token).send(token)
            //res.redirect("/")
        } else {
            res.send("Invalid Password")
        }
    } catch {
        return res.status(500).send()
    }
})

app.get('/api/bstchecklist', async (req, res) => {
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

app.get('/api/images', async (req, res) => {
    req.header('auth-token',token)
    try {
        const docs = await Image.find()
        res.json(docs)
      } catch (err) {
        res.json(err)
      }
})

app.get("/api/cps", async(req,res)=>{
  try{
    const docs = await cps.find()
    res.json(docs)
  } catch (err) {
    res.json(err)
  }
})

app.post("api/cps", async(req,res)=>{
  try{
    const addCps = new cps({"provider":req.body.provider,"site_id":req.body.site_id,"site_id_2":req.body.site_id_2,"sap_id":req.body.sap_id,"site_name":req.body.site_name,"location":req.body.location,"sr_date":req.body.sr_date,"sr_no":req.body.sr_no,"sp_date":req.body.sp_date,"so_date":req.body.so_date,"rfi_date":req.body.rfi_date,"on_air_date":req.body.on_air_date,"live_date":req.body.live_date,"rfi_accept_date":req.body.rfi_accept_date,"contact_details":req.body.contact_details,"remarks":req.body.remarks,"update_on":req.body.update_on})
    const added = await addCps.save()
    res.json({status: true, id: added._id})
  }catch(err){
    res.json({status: false, message: err})
  }
})

app.post('/api/newimage', async (req, res) => {
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
