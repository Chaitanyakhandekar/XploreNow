import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const upload = multer({
    storage:storage,limits: {
    fileSize: 8 * 1024 * 1024 // 8MB max per file
  }})