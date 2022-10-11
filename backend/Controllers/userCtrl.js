const User = require("../DBmodels/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");
const cloudinary = require("../Utils/cloudinary");
const sendToken = require("../Utils/jwtToke");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "Invalid email." });
      }
      if (phone && !validatePhoneNumber(phone)) {
        return res.status(400).json({ msg: "Invalid mobile number." });
      }
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
        phone,
      };

      // send a verification mail to user for verify email
      const activation_token = createActivationToken(newUser);
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;

      //send this url to email for verification
      const obj = { name, email, url, txt: "Verify your email address" };
      sendMail(obj);

      res.status(201).json({
        msg: `Register Success! an activation link is send to ${email}`,
        activation_token,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.params;

      // this will decrypt our token into object;
      const user = jwt.verify(
        activation_token,
        process.env.JWT_ACTIVATION_TOKEN_SECRET
      );

      // console.log(user);
      const { name, email, password, phone } = user;

      const check = await User.findOne({ email });
      if (check) {
        return res.status(400).json({ msg: "This email already exist." });
      }
      const newUser = new User({
        name,
        email,
        password,
        phone,
      });
      await newUser.save();
      sendToken(newUser, 201, res, "Account has been activated!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist" });
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return res.status(400).json({ msg: "Password is incorrect." });
      }
      // save cookies to browser
      sendToken(user, 200, res, "Login success.");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // getAccessToken: async (req,res)=>{
  //     try {

  //         const rf_token = req.cookies.refreshToken;

  //         if(!rf_token)
  //             return res.status(400).json({msg: "Please login now!"});

  //         jwt.verify(rf_token, process.env.JWT_REFRESH_TOKEN_SECRET, (err,user) =>{
  //             if(err){
  //                 return res.status(400).json({msg: "Please login now!"});
  //             }
  //             const access_token = createAccessToken({id: user.id});
  //             res.json({access_token});
  //         });

  //     } catch (err) {
  //         res.status(500).json({msg: err.message});
  //     }
  // },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "This email does not exist." });
      }
      // creacte access token and send it to mail
      const reset_token = createResetToken({ email });
      const url = `${process.env.CLIENT_URL}/user/reset/${reset_token}`;
      const { name } = user;
      user.resetPasswordToken = reset_token;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      await user.save();
      sendMail({ name, email, url, txt: "Reset your password" });
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const { reset_token } = req.params;
      const passwordHash = await bcrypt.hash(password, 12);
      const { email } = jwt.verify(
        reset_token,
        process.env.JWT_RESET_TOKEN_SECRET
      );
      console.log(password);
      const user = await User.findOne({ email }).select("+password");
      if (
        !user ||
        !user.resetPasswordExpire ||
        Date.now > user.resetPasswordExpire
      ) {
        res.json({ msg: "Invalid link!" });
      }
      user.password = passwordHash;
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      console.log(user);
      await user.save();
      sendToken(user, 201, res, "Password successfully changed!");
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id).select("+password");

      const isMatch = await user.comparePassword(oldPassword);

      if (!isMatch) {
        return res.status(400).json({ msg: "Old Password is incorrect." });
      }
      passwordHash = await bcrypt.hash(newPassword, 12);
      user.password = passwordHash;
      await user.save();

      return res.status(201).json({ msg: "Password changed successfully!" });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ msg: "No user found!" });
      }
      res.json({ msg: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getMyInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({ msg: user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getUsersAllInfor: async (req, res) => {
    try {
      const user = await User.find();
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("jwtToken");
      return res.status(200).json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, phone } = req.body;
      if (phone && !validatePhoneNumber(phone)) {
        return res.status(400).json({ msg: "Invalid phone number" });
      }
      await User.findOneAndUpdate({ _id: req.user.id }, req.body);
      return res.json({ msg: "Update success!" });
    } catch (err) {}
  },

  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await User.findById(id).select("+role");
      if (!user) {
        return res.status(400).json({ msg: "Invalid user" });
      }
      user.role = role;
      user.save();
      return res.json({ msg: "Update success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ msg: "Invalid user" });
      }
      const imgId = user.avatar.public_id;
      if (imgId) {
        await cloudinary.v2.uploader.destroy(imgId);
      }
      user.remove();
      return res.json({ msg: "delete success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const imgId = user.avatar.public_id;
      if (imgId) {
        // destroy the photo on cloud
        await cloudinary.v2.uploader.destroy(imgId);
      }
      const files = req.files;
      const file = files.file;
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "College Bazaar",
        width: 150,
        height: 150,
        crop: "fill",
      });

      user.avatar.url = result.secure_url;
      user.avatar.public_id = result.public_id;
      user.save();
      return res.json({ msg: result });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createResetToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_RESET_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = userCtrl;
