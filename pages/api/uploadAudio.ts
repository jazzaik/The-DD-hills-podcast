var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

export const config = {
  api: {
    bodyParser: false,
  },
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/audios")
  },
  filename: function (req, file, cb) {
    cb(null, "Name-Audio.mp3")
  },
})

var upload = multer({ storage: storage })

export default (req, res) => {
  upload.array("podAudio", 1)(req, {}, err => {
    console.log(err)
    console.log(req.files) // do something with the files here
  })
  res.status(200).send({})
}