const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//mysql connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'photogram'
  });
connection.connect();

//register logic
router.post('/',(req,res)=>{
    const {username,password,email} = req.body;
    connection.query('SELECT * FROM users WHERE username = ? OR email = ?', [username,email], function (error, results, fields) {
        if (error) throw error;
        else {
            if(results.length>0){
            res.send({alert:'Email or Username already exists'});
            return true;
            }else{
                connection.query('INSERT INTO users (username,password,email) values (?,?,?)', [username,password,email], function (error, results, fields) {
                    if (error) throw error;
                    else res.send({alert:`New user ${username} successfully added`});
                    return true;
                });
            }
        }
    });
    
})

module.exports = router;