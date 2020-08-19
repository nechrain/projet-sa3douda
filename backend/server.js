const express = require("express");
const mongoose = require("mongoose");
//const nodemon= require ("nodemon");
const app = express();
const cors = require("cors");
const multer = require("multer");
const port = 1305;
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://NessrineChammakhi:NessrineChammakhi@nesscluster.dieq5.mongodb.net/sannefa?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB Connected…");
  })
  .catch((err) => console.log(err));

const routerplatjS = require("./router/splatjour");
app.use("/platjour/", routerplatjS);

//upload image//
app.use(express.static("./public"));
const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
}).single("image");
app.post("/image", (req, res) => {
  upload(req, res, (err) => {
    console.log("immage", req.file);
    if (err) {
      res.send({ msg: err });
    } else {
      if (req.file == undefined) {
        res.send({ msg: "Error: No File Selected!" });
      } else {
        if (req.file) res.send(req.file.filename);
        else res.send("file undefind");
        console.log(req.file);
      }
    }
  });
});
