//modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app =  express();
const PORT = 3005

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
app.use('/img',express.static(path.join(__dirname, 'images')));

//routes
const register = require('./routes/register');
const login = require('./routes/login');
const albums = require('./routes/albums');
app.use('/register',register);
app.use('/login',login);
app.use('/albums',albums);

//listening to port
app.listen(PORT,()=>{
    console.log(`app is listening to port ${PORT}`)
})

//mysql connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'photogram'
  });
connection.connect();
connection.query('TRUNCATE TABLE session');



