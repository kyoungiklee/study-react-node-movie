const express = require('express')
const app = express()
const port = 5000


//MongoDB 접속 
const config = require("./config/key")

const mongoose = require("mongoose")

mongoose.connect(config.mongoURI, {}).then(()=>{
    console.log("MongoDB Connected...")
}).catch((err) => {
    console.log(err)
} )

//body-parser 설정
const bodyParser = require("body-parser")
//application/x-www-form-urlencoded 로 전달되는 데이터를 분석할 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }))
//application/json 로 전달되는 데이터를 분석할 수 있게 해준다. 
app.use(bodyParser.json())

const { User } = require("./models/User")

//요청 router
app.get('/', function (req, res) {
    res.send('Hello World')
})


//회원가입을 위한 Register router 만들기
app.post('/register', async (req, res) => {
    // 회원가입시 필요한 정보를 request로부터 찾아 MongoDB에 저장한다. 
    const user = new User(req.body)

    const result = await user.save().then(() => {
        res.status(200).json({success: true})
    }).catch(err => {
        res.status(400).json({success: false, error: err})
    })
})

//port 오픈
app.listen(port, () => console.log(`Example app listening on port ${port}`))