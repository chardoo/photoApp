const express = require('express');
const router = express.Router();
const con = require('../database/connect')
const passwordHash = require('password-hash');
const generateid =  require('custom-id');
const multer = require('multer');
const fs =  require('fs');
const path = require('path');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {    
      let dir =   './userprofile/' + req.body.username
      if(!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
    console.log(dir);
    cb(null,  dir)
    
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})
let upload = multer({ storage: storage })  

router.post('/reg',upload.array('profilepic', 15), function(req,res,){
    
         let newuserid =  generateid({ "name":req.body.username,   "email":req.body.email, randomLength:3 })
         let file = req.files
         const today = new Date();
         hashed = passwordHash.generate(req.body.password)
         const newuser =
         { 
             "user_id":newuserid,
             "username":req.body.username,
             "date_of_birth": req.body.date_of_birth,
             "phone_number": req.body.phone_number,
             "email":req.body.email,
             "password":hashed,
             "profilepic": file[0].originalname,
             "date_created":today,
             
         }
         con.query('INSERT INTO users SET ?',newuser, function (error, results, fields) {
           if (error) {
              res.render("error");
           }else{
             
               // changing file names
                const imageDirPath = path.resolve('./userprofile/'+req.body.username);
                const files = fs.readdirSync(imageDirPath);
                for(var i =0; i<files.length;i++){
                  fs.renameSync(imageDirPath + `/${files[i]}`,
                  imageDirPath + `/${i}.jpg`,
                  err => console.log(err)
                  )
                }
               

             res.redirect('/loginuser')
         
           }
         });
})
module.exports = router;