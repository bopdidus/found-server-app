import * as multer from 'multer';
import * as path from 'path';
import { Buffer } from 'buffer';



const imageFilter = function (req, file, cb) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
         req.fileValidationError = "Forbidden extension";
         return cb(null, false, req.fileValidationError);
   }
   cb(null, true);
}

const store = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, file, cb){
        let ext = path.extname(file.originalname);
        //regular expressions
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|JPG|JPEG)$/)) {
        var  message = `${file.originalname} is invalid. Only accept png/jpeg.`;
         return cb(new Error(message), null);
        }
        req.body.image=Date.now()+'-'+file.originalname
        cb(null, req.body.image);
    }
})

const encrypt = (text) =>{
    return new Buffer(text, 'utf8').toString('base64');
} 

const decrypt = (encryptedString) =>{
    return new Buffer(""+encryptedString, 'base64').toString('ascii');
} 


export { imageFilter, store, encrypt, decrypt }