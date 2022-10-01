const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({
    storage: storage,
})
module.exports = upload