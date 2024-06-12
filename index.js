const express = require('express')
const app = express()
const port = 5000

const dburl = "mongodb+srv://roadseeker:1q2w3e4r1!@boilerplate.rfd3gnc.mongodb.net/"

const mongoose = require("mongoose")

mongoose.connect(dburl, {}).then(()=>{
    console.log("MongoDB Connected...")
}).catch((err) => {
    console.log(err)
} )

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))