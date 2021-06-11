const mongoose = require("mongoose")
mongoose.connect(process.env.OFFICE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log(`Connection Successful`)
}).catch((e) => {
    console.log(`No Connection ${e}`)
})