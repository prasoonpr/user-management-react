const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// for register user
const registerUser = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image,
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};

//for login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const userPass = (await user.password) == req.body.password;
      if (userPass) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(201).json({
          message: "success",
          token,
          userDetails: {
            name: user.name,
            email: user.email,
            image: `/images/${user.image}`,
          },
        });
      } else {
        return res.json({ message: "Password not match" });
      }
    } else {
      return res.json({ message: "Email not match" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};


//for get userData
const getUserDetails = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      return res.status(201).json({
        userDetails: {
          name: user.name,
          email: user.email,
          image: `/images/${user.image}`,
        },
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};


//for update profile
const updateProfile = async (req,res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        
        const { name, email } = req.body;
        const image = req.file ? req.file.filename : null; // if a new image is uploaded

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        if (image) {
            user.image = image;
        }

        await user.save(); // Save updated user data to the database

        return res.status(200).json({
            message: 'Profile updated successfully',
            userDetails: {
                name: user.name,
                email: user.email,
                image: `/images/${user.image}`
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating profile', error });
    }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updateProfile,
};
