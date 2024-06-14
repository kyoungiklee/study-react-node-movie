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

const cookeParser = require("cookie-parser")
app.use(cookeParser())

//User model 가져오기
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

//로그인 기능을 만들다.
app.post('/login', async (req, res) => {
    //db에서 이메일을 찾는다. 
    await User.findOne({email: req.body.email}).then(
        user => {
            if(!user) {
                return res.json({
                    success: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
            //비밀번호가 같은지를 확인한다. userSchema에서 메소드를 구현한다.
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) 
                    return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
                //비밀번호가 같다면 token을 생성한다. 
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                    // 토큰을 쿠키에 저장한다. 
                    res.cookie("x_auth", user.token)
                    .status(200).json({success: true, userId: user._id})
                })

            })
        }
    )
})

//port 오픈
app.listen(port, () => console.log(`Example app listening on port ${port}`))