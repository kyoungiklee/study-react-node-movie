const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
        maxLength: 50
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

userSchema.comparePassword = function (plainPassword, callback) {
    //평문 패스워드와 암호화된 패스워드를 비교한다. 

    let user = this;
    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if (err) return callback(err,);
        callback(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema)
module.exports = { User };