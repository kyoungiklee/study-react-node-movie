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

# 09. 비밀정보 보호하기
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