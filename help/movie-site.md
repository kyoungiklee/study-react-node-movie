# 01. Movie-site 기능 구현 내용 소개
- api 사용법 
- 사용자 등록 기능
- 로그인 기능
- 영화 목록 리스트
- favorite 기능
- 댓글 기능

# 02. 전체적인 틀과 몽고DB 연결
- boiler plate 설치 
 - 레이아웃
 - 로그인
 - 로그아웃
 
- boiler plate 다운로드
 - [boiler plate git hub](http://github.com/jaewonhimnae/boilerplate-mern-stack)

- boiler plate 실행
 - client - react / server -node
 - npm 이용하여 라이브러리 설치 
  - npm을 이용하기 위해서는 node가 설치되어야함
  - node 설치 여부 확인
```sh
$ node -v
v20.12.2
```
- npm을 이용하여 server 라이브러리 설치
```sh
npm install
```
- npm을 이용하여 client 라이브러리 설치
```sh
cd client
npm install
```
- dev.js 파일 생성
 - dev 환경에서 개발을 하는 경우 DB 연결정보등 설정 정보 관리

- 몽고DB 연결키 만들기 및 dev.js에 연결정보 등록
```javascript
//dev.js
moudule.export = {
    mongoURI='' //이곳에 연결정보 설정
}
```
# 03. The Movie DB API 설명
- [The Movie DB Web Site 이동](https://www.themoviedb.org/)
- 가입후 로그인 & API_KEY 받기
```text
id: roadseeker
pass: 1q2w3e4r1!

aii_kye: b8eb9a2ff62c97e773ca2a69e6a5c25d
eyJhbGciOiJIUzI1NiJ9.API Read Access Token: eyJhdWQiOiJiOGViOWEyZmY2MmM5N2U3NzNjYTJhNjllNmE1YzI1ZCIsInN1YiI6IjY2NWVhYTdiYWQzMjg3M2UyOTFjMmYzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8PbctRqjvg0EwHNE0bQWNVCL1jfYb9JKOgxmk110JLE
```
- Text Editor에서 the movie db api를 위한 설정
```javascript
//client > src > component > Config.js
//자주 사용하는 주소정보를 상수로 정의한다. 
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';

```
# 04. Landing page 만들기
* 전체적인 Template을 간단하기 만들기
```javascript
function LandingPage() {
    retrun (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main image*/}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Card*/}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <button>Load More</button>
        </div>
        </div>
        
    )
}
export default LandingPage
```
* Movie API에서 가져온 모든 데이터를 state에 넣기
```javascript
import {API_URL, API_KEY} from '../../Config.js'
const [Movies, setMovies] = useState([]);
useEffect(() => {
    // endpoint 문자열을 만들다. 
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint) //fetch() 함수를 사용하여 endpoint로부터 데이터를 가져온다
        .then(response => response.json()) // json객체로 변환한다.
        .then(data => {
            setMovies([data.results]) //state에 사용한 데이터를 담는다. 
        })
});
```
* Main image component 만들기
```javascript
//client > src > component > LandingPage > Section > MainPage.js
//MainImage.js Main image 컴포넌트를 만든다.
//Main image는 가장 인기있는 영화를 표시한다. 
//이미지와 title, description을 가진다. 
import React form 'react'
function MainImage(props) {
    return(
        {/*background image를 스타일링한다. */}
        <div style={{background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%, rgba(0,0,0,0)
        41%, rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #1c1c1c,` 
            height: '500px',
            ....

        }}> 
            <div> 
                <div style={{position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                <h2 style={{color: 'white'}}>{props.title}</h2> {/*LandingPage 컴포넌트에서 전달된 title 정보 */}
                <p style={{color: 'white', fontSize: '1rem'}}>{props.text}</p> {/*LandingPage 컴포넌트에서 전달된 description 정보*/}

                </div>
            </div>
        </div>
    )
}
export default MainImage // 다른곳에서 컴포넌트를 사용할수 있도록 한다.  
```
* LandigPage에서 MainImage component로 필요한 데이터 전달하기
```javascript
import MainImage from './Section/MainImage'
const [Movies, setMovies] = useState([]);
const [MainMovieImage, setMainMovieImage ] = useState(null)
useEffect(() => {
    // endpoint 문자열을 만들다. 
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint) //fetch() 함수를 사용하여 endpoint로부터 데이터를 가져온다
        .then(response => response.json()) // json객체로 변환한다.
        .then(data => {
            setMovies([data.results]) //state에 사용한 데이터를 담는다. 
            setMainMovieImage(data.results[0]) //data의 첫번째 Movie정보를 MainMovieImage state에 담는다.
        })
});

 retrun (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main image*/}

             {/*메인이미지 컴포넌트 넣고 props로 컴포넌트 생성시 필요한 데이터(image url, title, description)를 전달한다. .*/}
             {MainMovieImage && {/*MainMovieImage 정보가 있으면 MainImage 컴포넌트를 그려라*/}
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
             }
            
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Card*/}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <button>Load More</button>
        </div>
        </div>
        
    )

```

# 05. Grid card component
* Grid card component 만들기
```javascript
...
import GridCards form '../commons/GridCards';
import { Row } from 'antd';
...
retrun (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main image*/}
            
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Card*/}
                {/*GridCards 컴포넌트를 배치하고 GridCards 컴포넌트로 넘겨줄 데이터를 props로 전달한다.*/}
                {/*<Row> </Row> ==> Ant Design 컴포넌트 [16, 16]은 여백을 줄수 있다. */}
                <Row gutter={[16, 16]}> 
                    {/*map()메소드를 사용하여 가져운 movies 정보를 Grid 컴포넌트로 전달한다.*/}
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button>Load More</button>
            </div>
        </div>
        
    )

```
* GridCard 컴포넌트 만들기
```javascript
//client > src > component > views > commons > GridCards.js
// commons 폴더 밑으로 만든 이유는 여러곳에서 사용할 수 있는 컴포넌트이므로 commons 폴더 아래로 둠
import React from 'react'
import { Col } from 'antd'
function GridCards() {
    return (
        //ant desing grid system
         {/*전체 24로 하여 lg={6}은 화면의 크기가 lg인 경우 6으로 컴포넌트가 6 * 4 즉 4개가 들어가는 것을 의미, md={8}는 화면이 중간이면 8 * 3으로 3개의 컴포넌트, xs={24}는 최소의 경우 1개의 컴포넌트가 그리드에 있다는 의미*/}
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName} />
                </a>
            </div>
        </Col>
    )
}
export default GridCards
```
# 06. Load More Function 만들기
* Load More Function
```javascript
const [Movies, setMovies] = useState([]);
const [MainMovieImage, setMainMovieImage] = useState(null);
const [CurrentPage, setCurrentPage] = useState(0); // 현재 페이지 정보를 가지는 state

const fetchMovies =  (endPoint) => {
    fetch(endPoint)
        .then(response => response.json)
        .then(data => {
            setMovies([...Movies, ...data.results]) // 기존에 있던 data에 추가된다. 
            setMainMovieImage(data.result[0])
            setCurrentPage(data.page)
        })
}

const loadMoreItems = () => { // Load More 버튼을 클릭할 때마다 Movie 정보를 가져와 기존데이터에 추가한다. 
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
    fetchMovies(endPoint); 
}

useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endPoint)
}, []) // [] 빈배열을 넣어주는 경우 처음 한번만 로드 된다. 

...
retrun (
        <div style={{width: '100%', margin: '0'}}>
            {/* Main image*/}
            
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Card*/}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
        
    )

```
# 07. Movie detail 페이지 만들기
 - 특정 영화에 해당하는 상세 정보 가져오기 
 - props.match.params.movieId
 - Movie api에서 가져온 정보를 State에 넣기
 - 전체적인 Template 간단히 만들기
 ```javascript
 // client > component > views > MovieDetail > MovieDetail.js
 import React from 'react';
 import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
 import MainImage from '../../MainImage';
 import MovieInfo from './Sections/MovieInfo';


 function MovieDetail(props) {
 let movieId = props.match.params.movieId;
 const [Movie, setMovie] = useState([])

 useEffect(() => {
    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endPointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endPointMovieInfo)
        .then(response => response.json)
        .then(data => {
            console.log(data);
            setMovie(data)
        })
 , [])

    return (
        <div>
            { /* Header*/}
            {Movie &&
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}              
                    />
                }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>

                {/* Movie info */}
                
                <MovieInfo movie={Movie}/>
                <br/>
                {/* Actor Grid */}

                <div {{diplay: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button>Toggle Actor View</button>
                </div>
            </div>
        </div>
    )
 }
 export default MovieDetail
 ```
 - router 만들기
 ```javascript
...
import MovieDetail from "./views/MovieDetail/MovieDetail";
...
function App() {
    return (
        <Suspense fallback={(<div>Loding...</div>)}>
            <NavBar>
                <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
                <Switch>
                    ...
                    <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)}> {/*movieDetail router를 등록한다.(react 6.x 버전이후 navigate로 변경됨)*/}
                </Switch>
                
                </div>
            </NavBar>
        </Suspense>
    )
}
 ```
- Movie Info component 만들기
```javascript
//MovieInfo.js
// client > component > views > MovieDetail > Sections > MovieInfo.js
import React from 'react';
import { Descriptions, Badge} from 'antd'

function MovieInfo(props) {
    let movie = props.movie;
    return (
        <Descriptions title bordered>
            <Discriptions.Item label="Title">{movie.original_title}</Discriptions.Item>
            <Discriptions.Item label="release_date">{movie.release_date}</Discriptions.Item>
            <Discriptions.Item label="revenue">{movie.revenue}</Discriptions.Item>
            <Discriptions.Item label="runtime">{movie.runtime}</Discriptions.Item>
            <Discriptions.Item label="vote_average" span={2}>{movie.vote_average}</Discriptions.Item>
            <Discriptions.Item label="vote_count">{movie.vote_count}</Discriptions.Item>
            <Discriptions.Item label="status">{movie.status}</Discriptions.Item>
            <Discriptions.Item label="popularity">{movie.popularity}</Discriptions.Item>
        </Descriptions>
    )
}
export default MovieInfo
```


# 08. 영화 출연진들 가져오기
 - 영화에 나오는 Crews 정보 가져오기
 - 가져온 Crew 정보는 state에 넣기
 - State에 보관된 Data들을 화면에 보여주기
```javascript
// client > component > views > MovieDetail > MovieDetail.js
 import React from 'react';
 import GridCards from '../commons/GridCard';
 import {Row} from 'antd';
....


 function MovieDetail(props) {
 let movieId = props.match.params.movieId;
 const [Movie, setMovie] = useState([]);
 const [Casts, setCasts] = useState([]);
 const [ActorToggle, setActorToggle] = useState(false);

 useEffect(() => {
    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endPointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endPointMovieInfo)
        .then(response => response.json)
        .then(data => {
            console.log(data);
            setMovie(data)
        })

    fetch(endPointCrew)
        .then(response => response.json)
        .then(data => {
            console.log(data);
            setCast(data.cast)
        })
 }, []);

 const toggleActorView = () => {
    setActorToggle(!ActorToggle);
 }

    return (
        <div>
            { /* Header*/}
            {Movie &&
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}              
                    />
                }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>

                {/* Movie info */}
                
                <MovieInfo movie={Movie}/>
                <br/>
                {/* Actor Grid */}

                <div {{diplay: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>
                {/*ActorToggle true인 경우만 출연배우를 보여준다.*/}
                {ActorToggle &&
                    <Row gutter={[16, 16]}> 
                        {/*map()메소드를 사용하여 가져운 movies 정보를 Grid 컴포넌트로 전달한다.*/}
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }
                
            </div>
        </div>
    )
 }
 export default MovieDetail
```
- GridCard component 변경
```javascript
import React from 'react'
import { Col } from 'antd'
function GridCards(props) {
    return (
        //LandingPage component
        if(props.landingPage) {
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        //MovieDetail component 
        } else {
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative'}}>
                    
                    <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName} />
                   
                </div>
            </Col>

        }
        
    )
}
export default GridCards
```
- Landing page 변경
```javascript

<div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Card*/}
                {/*GridCards 컴포넌트를 배치하고 GridCards 컴포넌트로 넘겨줄 데이터를 props로 전달한다.*/}
                {/*<Row> </Row> ==> Ant Design 컴포넌트 [16, 16]은 여백을 줄수 있다. */}
                <Row gutter={[16, 16]}> 
                    {/*map()메소드를 사용하여 가져운 movies 정보를 Grid 컴포넌트로 전달한다.*/}
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            
                            />
                        </React.Fragment>
                    ))}
                </Row>

            </div>

```
# 09. Favorite 기능 만들기(1)
 - Favorite Model 만들기
    - userFrom
    - movieId
    - movieTitle
    - MovieImage
    - MovieRunTime
```javascript
//server > models > Favorite.js
const mongoose = require('momgoose');
const Schema = mongoose.Schema;
const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String, 
    },
    movieTitle: {
        type: String, 
    },
    moviePost: {
        type: String, 
    },
    movieRunTime: {
        type: String, 
    }
}, {timestamps: true})

const Favorite = mongoos.model('Favorite', favoriteSchema)

module.exports = {Favorite}
```
 - Favorite button UI 만들기
```javascript
// client > component > views > MovieDetail > MovieDetail.js
....
import Favorite from './Sections/Favorite.js';
....


 function MovieDetail(props) {
 let movieId = props.match.params.movieId;
 const [Movie, setMovie] = useState([]);
 const [Casts, setCasts] = useState([]);
 const [ActorToggle, setActorToggle] = useState(false);

 useEffect(() => {
    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endPointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endPointMovieInfo)
        .then(response => response.json)
        .then(data => {
            console.log(data);
            setMovie(data)
        })

    fetch(endPointCrew)
        .then(response => response.json)
        .then(data => {
            console.log(data);
            setCast(data.cast)
        })
 }, []);

 const toggleActorView = () => {
    setActorToggle(!ActorToggle);
 }

    return (
        <div>
            { /* Header*/}
            {Movie &&
                    <MainImage 
                        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}              
                    />
                }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/*Favorite button*/}
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/*Favorite component를 호출할때 userFrom, movieId 정보는 props로 전달한다. */}
                    <Favorite 
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom={localStorage.getItem('userId')}
                    />
                </div>

                {/* Movie info */}
                
                <MovieInfo movie={Movie}/>
                <br/>
                {/* Actor Grid */}

                <div {{diplay: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>
                ....
                
            </div>
        </div>
    )
 }
 export default MovieDetail
```

 - Favorit component 만들기
```javascript
//client > component > views > MovieDetail > Section > Favorite.js
import React from 'react';
import Axios form 'axios';


function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieinfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime


    let variables = {
        userFrom,
        movieId
    }

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables )
            .then(response => {
                if(response.data.success) {
                    
                } else {
                    alert('favorite 숫자정보를 가져오는데 실패하였습니다');
                }
            })
    }, [])

    return (
        <div>
        </div>
    )
}
```


# 10. Favorite server 기능 만들기(2)
 - 얼마나 많은 사람이 이 영화를 Favorite 리스트에 넣었는지 그 숫자정보 가져오기
    - favorite 숫자 가져오기 router 만들기
    - favorite router 등록하기
 ```javascript
//server > routes > Favorite.js
const express = require('express');
const router = express.router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    

    //mongoDB에서 favorite 숫자 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .then((err, info) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, favoriteNumber: info.length})
        })
})
 ```


 ```javascript
 ....
 const mongoos = require('mongoose');
 const connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
 })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    app.use(cors());
    
    //to not get any deprecation warning or error
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({extened: true}));
    
    //to get json data
    //support parsing of application/json type post data
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use('/api/users', require('./routes/users'));
    app.use('/api/favorite', require('./routes/favorite'));
....
 ```



# 11. Favorite list에 있는지 확인 기능 만들기(3)
 - 내가 이영화를 이미 Favorite리스트에 넣었는지 아닌지 정보 얻기
 
 ```javascript
 //server > routes > Favorite.js
const express = require('express');
const router = express.router();
const {Favorite} = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => { 
    //mongoDB에서 favorite 숫자 가져오기
    ....
})

router.post('/favorited', (req, res) => {
    // 내가 이 영화를 favorite 리스트에 넣었는지 mongoDB에서 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .then((err, info) => {
            if(err) return res.status(400).send(err);
            let result = false;

            if(info.length !==0) {
                result = true;
            }
            res.status(400).send({success: true, favorited: result})
        })
})
module.exports = router;
```

- 내가 favorite 리스트에 담았는지 확인하는 요청 만들기
 ```javascript
//client > component > views > MovieDetail > Section > Favorite.js
import React from 'react';
import Axios form 'axios';
import {useEffect, useState} from 'react';

function Favorite(props) {
    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieinfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);


    let variables = {
        userFrom,
        movieId
    }

    useEffect(() => {
        //이 영화를 몇명이 좋아하는지 숫자 정보 요청하기
        Axios.post('/api/favorite/favoriteNumber', variables )
            .then(response => {
                
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                    
                } else {
                    alert('favorite 숫자정보를 가져오는데 실패하였습니다');
                }
            })
        
        //내가 이 영화에 대해 favorite 리스트에 담았는지 여부 정보 요청하기
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('favorit 정보를 가져오는데 실패하였습니다')
                }
            })
    }, [])

    return (
        <div>
            <button>{Favorited ? "Not Favorite" : "Add to Favorite "} {FavoriteNumber}</button>
        </div>
    )
}
```


# 12. Favorite list에 추가/삭제 기능 삭제
 - Favorite 리스트에 추가/삭제요청
 - 아직 Favorite리스트에 않넣었을 때
 - 이미 리스트에 넣어져 있을때
 ```javascript

//client> src > component > views > MovieDetail > Sections > Favorite.js
    .....
    import {Buttton} from 'antd';
    // 상위 컴
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variable = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {
        if(favorited) { // 이미 favorite 리스트에 있는 경우
            Axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorite(!favorited)

                    } else {
                        alert("Favorite 리스트에서 지우는 것을 실패하였습니다.")
                    }
                })
           
        }else { // favorite 리스트에 넣지 않은 경우
             Axios.post('/api/favorite/addToFavorite', variable)
                .then(response =>{
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorite(!favorited)
                    }else{
                        alert("Favorite 리스트에 추가하는 것을 실패하였습니다")
                    }
                })
        }
    }



    return(
        <div>
            <Button onClick={onClickFavorite}>{favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )



 ```
 - 특정 영화를 Favorite 리스트에 넣는 기능 만들기
 - 특정 영화를 Favorite 리스트에서 빼는 기능 만들기
 ```javascript
//favorite.js
import Favorite = require(../models/Favorite);

router.post('addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true, doc})
    })
})
router.post('removeFromFavorite', (req, res) => {

    Favorite.findAndDelete({movieId: req.body.movieId, userFrom:req.body.userFrom}
        .exec((err, doc) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true})
        })
    )

})
 ```



# 13. Favorite 페이지 만들기(1)
 - Favorite 페이지 위한 템플릿 만들기
 ```javascript
 //client > src > components > views > FavoritePage > FavoritePage.js
 import React from 'react';
 import './favorite.css'; // css를 임포트한다. 
 import Axios from 'axios';

 function FavoritePage() {
    useEffect(() => {
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {

                } else {
                    alert("영화 정보를 자겨오는데 실패하였습니다");
                }
            })
    }, [])

    return(
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Tittle</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
    )
 }
 export defautl FavoritePage
 ```
 - favarite 페이지를 위한 css 파일 만들기
 ```css
 /*client > components > views > FavoritePage > favorite.css*/
 table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
 }
 td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
 }

 tr:nth-child(even) {
    background-color: #dddddd;
 }
 ```
 - App.js 에 favorite 페이지를 위한 라우터를 추가한다.
 ```javascript
 //client > src > components > App.js
 //App 기동시 페이지의 이동경로를 지정한다. favorite 메뉴버튼 클릭 시 /favorite url로 이동한다. 
 import FavoritePage from "./views/FavoritePage/FavoritePage"
 
 function App() {
    return(
        <Suspense>
            <NavBar />
            ....
            <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
            <Switch>
                ....
                {/*true인경우 로그인한 사용자만 접근 가능하다.*/}
                <Route exact path="/favorite" component={Auth(FavoritePage, true)}></Route> 
            </Switch>
            </div>
            <Footer />
        </Suspense>
    )
 }
 export default App

 ```
  - favorite 메뉴를 구성한다. 
  ```javascript
  //client > src > components > views > NavBar > Sections > LeftMenus.js
  import React from 'react'
  import {Menu} from 'antd'

  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;

  function LeftMenus(props) {
    return(
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="favorite>
                <a href="/favorite">Favorite</a>
            </Menu.Item>
            <SubMenu title={<span>Blogs</span>}>
                <MenuItemGroup title="Item1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup title="Item2">
                <MenuItemGroup title="Item2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    )
  }

  ```

 - MongoDB에서 favorited 된 영화정보 가져오기
 ```javascript
 ....
 router.post('/getFavoriteMovie' (req, res) => {
    Favorite.find({userFrom: req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err);
            res.satus(200).json({success: true, favorites})
        })
 })
 ....
 ```
 - 가져온 데이터들을 화면에 보여주기
 ```javascript
//FavoritePage.js
....
const [Favorites, setFavorites] = useState([]);

....
Asios.post('/api/favorite/getFavoritedMovie', {localStorage.getItem('userId')})
    .exec(response => {
        if(response.data.success) {
            setFavorites(response.data.favorites)

        }else{
            alert("영화 정보를 가져오는데 실패하였습니다")
        }
    })
....

    return(
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Tittle</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                {Favoties.map((favorite, index) = (
                    <tr key={index}>
                        <td>{favorite.movieTitle}</td>
                        <td>{favorite.movieRunTime} mins</td>
                        <td>{remove}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
....

 ```

# 14. Favorite 페이지 만들기(2)
 - favorite 리스트 영화제목에 마우스 오버시 사진 나오게 처리
 ```javascript
 ....
 import {Popover} from 'antd';
 import {IMAGE_BASE_URL} from '../../Config';
 ....
    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                }
            </div>
        )


        return <tr key={index}>
            <Popover content={content} title={favorite.movieTitle}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button>Remove</button></td>
        </tr>
   })

    return(
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Tittle</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                {renderCards}
                </tbody>
            </table>
        </div>
    )
....

 ```
 - Remove 기능 만들기

 ```javascript
 // FavoritePage.js
 ....
 const onClickDelete = (movieId, userFrom) => {

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success) {
                    setFavorites(response.data.favorites);
                }else{
                    alert('영화 정보를 가져오는데 실패 했습니다.')
                }
            })
    }

    useEffect(() => {
        fetchFavoredMovie();
    }, [])

    const variable = {
        movieId,
        userFrom
    }
    Axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if(response.data.success) {
                fetchFavoredMovie();
            }else{
                alert("favorite 리스트에서 지우는데 실패하였습니다");
            }
        })
 }

 const renderCards = Favorites.map((favorite, index) => {\

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                }
            </div>
        )


        return <tr key={index}>
            <Popover content={content} title={favorite.movieTitle}>
            <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
   })
....

 ```
 - favorite 목록지우기 서버기능 구현
 ```javascript
....
 route.post('/removeFromFavorite', (req, res) => {
    Favotire.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom}
        exec((err, doc) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({success:true}) 
        })
    )
 })

 ```

