const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxLength: 100
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
})

userSchema.pre('save', function (next) {
    //비밀번호를 암호화 시킨다. 
    let user = this;
    //password가 변경될 경우에만 암호화 과정을 적용한다. 
    if (user.isModified('password')) {
        //salt를 생성한다. 
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            // 생성된 salt를 이용하여 평문으로 전달된 사용자 패스워드를 암호화 한다.  
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next();
                user.password = hash;
                next();
            })
        })
    } else {
        //패스워드 변경된 경우가 아니라면 다음 프로세스를 처리한다. 
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    //평문 패스워드와 암호화된 패스워드를 비교한다. 
    let user = this;
    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if (err) return callback(err,);
        callback(null, isMatch);
    })
}

userSchema.methods.generateToken = function (callback) {
    let user = this;
    //jsonwebtoken library를 이용하여 토큰을 만든다.
    let token = jwt.sign(user._id.toString(), 'secretToken');
    user.token = token;
    user.save().then(() => {
        callback(null, user);
    }).catch(err => {
        callback(err, );
    })
}

userSchema.statics.findByToken = function (token, callback) {
    let user = this;
    jwt.verify(token, 'secretToken', function(err, decoded) {
        
        //유저아이디를 이용하여 유저를 찾는다. 
        user.findOne({"_id": decoded, "token":token}).then((user) => {
            callback(null, user);
        }).catch(err => {
            return callback(err,);
        })
    })
}


const User = mongoose.model('User', userSchema)
module.exports = { User };