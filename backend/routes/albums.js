const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const multer = require('multer');
const path = require('path')

//mysql connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'photogram'
  });
connection.connect();

//creates a new gallery for the user
router.post('/creategallery',async(req,res)=>{
    const {id,galleryname} = req.body
    console.log(galleryname,id)
    connection.query('INSERT INTO albums (albumname,user_id) values(?,?)',[galleryname,id],(error,results,field)=>{
        if(error) throw error;
        connection.query('SELECT * FROM albums WHERE user_id = ?',[id],(error,results,field)=>{
            if(error) throw error;
            else res.send(results)
        })
    })
})

//gets gallery of user
router.post('/getgallery',(req,res)=>{
    const {id} = req.body
    connection.query('SELECT * FROM albums WHERE user_id = ?',[id],(error,results,field)=>{
        if(error) throw error;
        else res.send(results)
    })
})

//multer config
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

//uploading an image to the album
router.post('/uploadimage',upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
      } else {
        console.log('file received');
        console.log(req.file.filename);
        console.log(req.body.id);
        var sql = "INSERT INTO images (imagename, album_id) VALUES (?,?)";
        connection.query(sql,[req.file.filename,req.body.id], function(err, result) {
            if(err)throw err
            else{
              res.redirect('back');
            }
        });
      }
});

//get images of the album
router.post('/getimages',(req,res)=>{
    const id = req.body.id;
    connection.query('SELECT * FROM images WHERE album_id = ?',[id],(error,results,field)=>{
        if(error) throw error;
        else res.send(results)
    })
})

module.exports = router;
