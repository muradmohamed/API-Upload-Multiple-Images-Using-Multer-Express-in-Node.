const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const GridFsStorage = require("multer-gridfs-storage");
const util = require("util");
const path = require("path");
const fs = require('fs');
var dir = './uploads';


// Set The Storage Engine
var storage = new GridFsStorage({
  url: "mongodb://localhost:27017/Newdb",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()} ${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()} ${file.originalname}`
    };
  }
});
  // Init Upload
  const upload = multer({
    storage: storage,
    files: 4,
    limits:{fileSize:  2 * 1024 * 1024 },
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).fields([{name:"myImage1", maxCount: 1 },{name:"myImage2", maxCount: 1 },{name:"myImage3", maxCount: 1},
  {name:"myImage4", maxCount: 1}])
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
  
  var uploadFilesMiddleware = util.promisify(upload);
  

  router.post("/upload_files",uploadFilesMiddleware, (req, res) => {

    upload(req, res, function (err) {

      const files = req.files
    
      console.log(req.files);
      

      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        if (files.length <= 0) {
          return res.send(`You must select at least 1 file.`);
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(409).send("Unexpected field.");
        }
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(409).send("File too large");
        }
        if (err.code === "LIMIT_FILE_COUNT") {
          return res.status(409).send("Too many files to upload.");
        }
        if (err.code === "LIMIT_FIELD_KEY") {
          return res.status(409).send("Field name too long");
        }
        if (err.code === " LIMIT_FIELD_VALUE") {
          return res.status(409).send("Field value too long");
        }
      } else if (err) {
        return res.send(`Error when trying upload many files: ${err}`);
      }
  
      // Everything went fine.
      return res.status(200).send(`Files have been uploaded.`);
    })
    
  
  }); 

module.exports = router;