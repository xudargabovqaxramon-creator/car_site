
const multer = require("multer")
const path = require("path")




const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "upload/")
    },
    filename: (req, file, cb) => {
        const umiquesuffix = Date.now() +"_"+Math.floor(Math.random() *1e9)
        const ext = path.extname(file.originalname)
        cb(null, `${umiquesuffix+ext}`)
    }
})
const upload = multer({storage})

module.exports = upload