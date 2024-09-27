const multer = require("multer");
const path = require("path");
const User = require("../models/user");

//storing the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// checking email is exist
async function existUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json({
        message: "user alredy exist",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
}

module.exports = {
  upload,
  existUser,
};
