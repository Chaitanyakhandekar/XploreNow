import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        cb(null,path.basename())
    }
})

export const upload = multer({
    storage:storage,limits: {
    fileSize: 6 * 1024 * 1024 // 6MB max per file
  }})