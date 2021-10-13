import * as multer from 'multer';
import * as path from 'path';
import { Buffer } from 'buffer';



const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    if(!file.siw)
    cb(null, true);
};

const store = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, file, cb){
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