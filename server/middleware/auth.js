const {User} = require("../models/User");

let auth = (req, res, next) => {
    //인증처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    console.log("", token);

    //토큰을 복호하한 후 user를 찾는다. 

    User.findByToken(token, (err, user) => {

        if(err) return res.status(400).send(err);
        if(!user) return res.status(200).json({isAuth: false, error: true});

        req.token = token;
        req.user = user;
        next();
    })

    //user가 있으면 인증 okey
}

module.exports = {auth};