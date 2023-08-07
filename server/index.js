const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
dotenv.config({path: './config.env'});
app.use(express.json());
app.use(require('./router/auth'));
app.use(require('./router/BasicRoutes'));
app.use(require('./router/SignUpReqRoutes'));
app.use(require('./router/UserRoutes'));
app.use(require('./router/leaveRoutes'));
app.use(require('./router/ResearchRoutes'));
app.use(cookieParser());
var cors = require('cors');    
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// {credentials: true, origin: 'http://localhost:3000'}
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.header('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

const PORT=process.env.PORT;
require('./db/conn');

app.get('/', (req, res)=>{
    res.send("Welcome to home page");
})
app.get('/about', (req, res)=>{
    res.send("Welcome to about page");
})
app.get('/contact', (req, res)=>{
    res.send("Welcome to contact page");
})
app.get('/signin', (req, res)=>{
    res.send("Welcome to signin page");
})
app.get('/signup', (req, res)=>{
    res.send("Welcome to signup page");
})
app.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`);
})