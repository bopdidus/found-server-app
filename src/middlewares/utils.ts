import * as multer from 'multer';
import * as path from 'path';

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

export { imageFilter, store }