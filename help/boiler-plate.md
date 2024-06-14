# 01. 노드 와 리액트
 - node는 javascript 언어를 사용하여 server단 프래그래밍을 할 수 있도록 하는 javascript runtime environment 이다. 
 - react는 사용자 인터페이스를 구성하기위해 사용하는 javascript library이다 

# 02. node를 설치한다. 
 - node를 최신버전으로 설치
 - node 설치 여부 확인
 ```sh
$ node -v
v20.12.2
 ```
 - node 개발 환경을 초기화 한다. 
 ```sh
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
 ```
 - node 환경 구성을 초기화하면 package.json 파일과 node_modules 폴더가 생성되고 node_modules 폴더 아래에 node 구동에 필요한 라이브러리들이 설치된다. 
 - Express를 설치한다. 
 ```sh
$ npm install express --save

up to date, audited 85 packages in 876ms

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 ```

 # 03. Mongo DB 연결
  - [Mongo DB 사이트 링크](https://cloud.mongodb.com/)
  - 회원가입, Database 생성, 사용자 생성 진행
  - mongoose를 설치한다. 
```sh
$ npm install mongoose --save

added 20 packages, and audited 85 packages in 8s

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
 - mongoose를 사용하여 mongoDB에 접속한다. 
```javascript
const express = require('express')
const app = express()
const port = 5000

//MongoDB 접속 
const dburl = "mongodb+srv://roadseeker:1q2w3e4r1!@boilerplate.rfd3gnc.mongodb.net/"
const mongoose = require("mongoose")

mongoose.connect(dburl, {}).then(()=>{
    console.log("MongoDB Connected...")
}).catch((err) => {
    console.log(err)
} )

//요청 entry point
app.get('/', function (req, res) {
    res.send('Hello World')
})

//port 오픈
app.listen(port, () => console.log(`Example app listening on port ${port}`))

```
# 04. MongoDB Model과 Schema 만들기
 - MongoDB Model과 스키마 만들기 (User)
```javascript
//models > User.js
const mongoose = require("mongoose");

//관리해야될 데이터의 정보구성에 대해 정의한다. 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50 //최대 길이는 50자이다. 
    },
    email: {
        type: String,
        trim: true, //데이터 저장시 trim을 한다. 
        unique: 1 //email은 유니크한 값이다. 
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

const User = mongoose.model('User', userSchema)
module.exports = { User };

```
# 05. Git 설치 및 원격에 소스 올리기
 - Git을 설치한다. 
 ```sh
$ git --version
git version 2.39.1.windows.1
 ```
 - Git을 초기화한다. 
 ```sh
 # git을 초기화 한다. 
$ git init
Initialized empty Git repository in C:/study/study-react-movie-site/.git/

# git 대상 파일들의 현재 상태를 조회한다. 
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        help/
        index.js
        models/
        node_modules/
        package-lock.json
        package.json

nothing added to commit but untracked files present (use "git add" to track)

# 현재 위치에서 하위의 모든 파일 및 폴더를 staging에 추가한다. 
$ git add . 

# .gitignore 설정 전에 staging에 올라간 관리 대상이 아닌 파일 지우기 
$ git rm --cached node_modules -r
 
 ```
  - [gitignore 파일 만들기 사이트](https://www.toptal.com/developers/gitignore)
    - 운영체제, 개발환경(IDE), 개발언어를 설정하면 필요한 gitignore를 생성해준다. 
 - Commit 하기 
 ```sh
# Author identity unknown 이라는 메시지 발생시 아래와 같이 config를 설정한다. 
$ git config user.email kyoungik.lee+1@gmail.com
$ git config user.name kyoungik.lee

# 변경내용을 로컬저장소에 커밋한다. 
$ git commit -m "node, express, mongoose 설정"
 ```
# 06. Github에 소스 올리기
 - git remote 설정
 ```sh
$ git remote add origin https://github.com/kyoungiklee/study-react-node-movie.git
# git에 push 하기
$ git push -u origin main
Everything up-to-date
branch 'main' set up to track 'origin/main'.
 ```

 # 07. Client와 Server 간 통신을 위한 Dependency 설정 및 회원가입 기능 만들기
  - body parser를 이용하여 전송된 데이터를 받는 라이브러리를 출력해야함
  - body 데이터를 분석(parse)해서 req.body로 받을 수있게 한다. 
  ```sh
$ npm install body-parser --save

up to date, audited 85 packages in 794ms

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilitie
  ```
  - 패키지를 다운로드하면 package.json에 body-parser dependency가 생성된다.
  ```json
....
  "dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.19.2",
    "mongoose": "^8.4.1"
  }
....
  ```
- Postman을 설치하여 API 호출 테스트시 사용한다. 
- 회원가입 서비스를 위한 register router를 만든다. 

# 08. Node Mon 설치
- 소스 변경 시 감지하여 자동으로 서버를 재시작하는 서비스
```sh
$ npm install nodemon --save-dev

added 29 packages, and audited 114 packages in 3s

17 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
- package.json에 nodemon dependency가 추가된다. 
- nodemon으로 시작할 수 있도록 스크립트 추가

```json
....
 "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "body-parser": "^1.20.2",
    "express": "^4.19.2",
    "mongoose": "^8.4.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.3"
  }
```

# 09. dev, prd 환경 설정하기
 - 설정정보를 dev환경과 운영환경으로 나누기
 - dev.js / prd.js로 환경설정 분기
 ```javascript
//dev.js
module.exports={
    mongoURI: 'mongodb+srv://roadseeker:1q2w3e4r1!@boilerplate.rfd3gnc.mongodb.net/'
}
 ```
 ```javascript
//prd.js
module.exports = {
    mongoURI: process.env.MONGO_URL,
}
 ```
  - key.js 파일에 설정환경 분리
```javascript
//NODE_ENV 환경이 "production" 이면 ./prd 환경을 읽는다. 
if(process.env.NODE_ENV === "production") {
    module.exports = require("./prd");
//아니면 dev.js 환경을 익는다. 
} else {
    module.exports = require("./dev");
}
```
 - .gitignore 파일에 dev.js 설정파일이 업로드 되지 않도록 처리
```text
### Dev environment ###
config/dev.js
```

# 10. Bcrypt로 비밀번호 암호화하기
- 사용자 비밀번호가 DB에 평문으로 저장되지 않도록 bcrypt로 암호화하여 저장
- Bycript library 설치하기 [bcrypt site](https://www.npmjs.com/package/bcrypt)
```sh
$ npm install bcrypt --save
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm WARN deprecated npmlog@5.0.1: This package is no longer supported.
npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated are-we-there-yet@2.0.0: This package is no longer supported.
npm WARN deprecated gauge@3.0.2: This package is no longer supported.

added 54 packages, and audited 168 packages in 5s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
- bcrypt 적용하기
```javascript
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

// save 전에 해당 기능을 우선 적용한다. 
userSchema.pre('save', function (next) {
    //비밀번호를 암호화 시킨다. 
    let user = this;
    //password가 변경될 경우에만 암호화 과정을 적용한다. 
    if(user.isModified('password')){
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

const User = mongoose.model('User', userSchema)
module.exports = { User };

```
# 11. 로그인 기능 만들기 - 패스워드 비교
 - router 만들기
 ```javascript

 //로그인 기능을 만들다.
app.post('/login', (req, res) => {
    //db에서 이메일을 찾는다. 
    User.findOne({email: req.body.email}).then(
        (err, user) => {
            if(!user) {
                return res.json({
                    success: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
            //비밀번호가 같은지를 확인한다. userSchema에서 메소드를 구현한다.
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch)
                    return res.json({
                        loginSuccess: false
                        , message: "비밀번호가 틀렸습니다."
                })
            })
        }
    )
})

 ```
 - User 모델에 패스워드를 비교하는 함수를 만든다. 
 ```javascript
//User.js
....
//인수로 client에서 전돨된 평문의 패스워드를 받아 암호화된 패스워드를 비교후 
//결과를 callback 함수로 전달한다. 
userSchema.comparePassword = function (plainPassword, callback) {
    //평문 패스워드와 암호화된 패스워드를 비교한다. 

    let user = this;
    //bcript.compare() 함수 사용
    bcrypt.compare(plainPassword, user.password, function(err, isMatch){
        if (err) return callback(err,); //함수 수행에 오류가 있으면 error 전달한다.
        callback(null, isMatch); //비교결과를 전달한다. 
    })
}
....
 ```

 # 12. 로그인 기능 만들기 - token 생성하기
 - token을 생성하기위해 jsonwebtoken library를 인스톨한다. [Json web token Site](https://www.npmjs.com/package/jsonwebtoken)
 ```sh
$ npm install jsonwebtoken --save

added 13 packages, and audited 181 packages in 2s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 ```
 - token을 cookie에 저장하기위해 cookie-parser library를 인스톨한다. 
 ```sh
$ npm install cookie-parser --save

added 2 packages, and audited 183 packages in 1s

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
 ```

  - 토큰 생성한다. 
```javascript
//User.js
// 결과값을 리턴하기위해 인수로 콜백함수를 받는다. 
userSchema.methods.generateToken = function (callback) {
    let user = this;
    //jsonwebtoken library를 이용하여 토큰을 만든다.
    let token = jwt.sign(user._id.toString(), 'secretToken');
    //생성된 토큰을 User 모델에 저장한다. 
    user.token = token;

    //User 모델의 변경사항을 MongoDB에 저장한다. 
    user.save().then(() => {
        callback(null, user);
    }).catch(err => {
        callback(err, );
    })
}
```
  - 생성된 토큰을 쿠키에 저장한다. 
```javascript
//index.js
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
                //비밀번호가 같다면 token을 생성한다. userSchema에 메소드를 구현한다. 
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
```