const multer = require("multer");

const  storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      //  console.log(req);
           cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
            const format=file.mimetype.split("/")[1];
            //console.log(req.user);
           cb(null, file.originalname)
    }
});

const filefilter=(req,file,cb)=>{
   // console.log(req.user);
  if(!file.originalname.match(/\.(jpg|gif|jpeg|png)$/)){
    cb(new Error("Wrong format file, is not an image"),false)
  }
  cb(null,true)
};

module.exports.multer=()=>multer({storage,fileFilter:filefilter});//MIDDLE