const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const nodemailer = require("nodemailer");
var jwt = require('jwt-simple');

//mysql connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'photogram'
  });
connection.connect();

//login logic
router.post('/',(req,res)=>{
    const {username,password} = req.body;
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username,password], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0){
            connection.query('INSERT INTO session (user_id) values (?)',[results[0].id],(error,results,fields)=>{
                if (error) throw error;
                else console.log('session added')
                res.send({isLogged:true,alert:'successfuly logged in'})
            })
        }else{
            res.send({alert:'user do not exist'})
        }
    });
})

//logout login
router.get('/logout',(req,res)=>{
    connection.query('TRUNCATE TABLE session',(error,resuts,field)=>{
        if(error) throw error;
        else res.send();
    })
})

//get session details
router.get('/session',(req,res)=>{
    connection.query('SELECT * FROM session',(error,results,field)=>{
        if(error) throw error;
        if(results.length > 0){
            connection.query('SELECT * FROM users WHERE id = ?',[results[0].user_id],(error,results,field)=>{
                const {id,username} = results[0];
                if(error) throw error;
                else res.send({isLogged:true,id:id,username:username})
            })
        }
    })
})

//nodemailer logic
async function main(email,token) {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: 'kirsten87@ethereal.email', 
        pass: 'Mus2XyRyAAEhtCZxR2',
      },
    });
    let info = await transporter.sendMail({
        from: 'Photogram', 
        to: email, 
        subject: 'Password reset link', 
        html: "<a href='http://localhost:3000/Login/resetpassword/" + token + "'>Reset password</a>", 
      });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info)
}

//link to reset password
router.post('/passwordresetlink',(req,res)=>{
    const email = req.body.email;
    connection.query('SELECT * FROM users where email = ?',[email],async (error,results,field)=>{
        if(error) throw error;
        if(results.length > 0){
            const oldpassword = results[0].password
            const id = results[0].id
            const payload = { oldpassword : oldpassword,id:id }
            const secret = 'secret';
            const token = jwt.encode(payload, secret);
            const link = await main(email,token).catch(console.error)
            res.send({
                mailexists:true,
                link:link
            })
        }else{
            res.send({
                mailexists:false
            })
        }
    })
})

//change password
router.post('/passwordreset',(req,res)=>{
    const {token,newpassword} = req.body;
    console.log(req.body)
    const secret = 'secret';
    const payload = jwt.decode(token, secret);
    console.log(payload)
    connection.query('UPDATE users SET password= ? WHERE id = ?',[newpassword,payload.id],(error,results,field)=>{
        if(error) throw error;
        else console.log('password changed')
    })
})
module.exports = router;