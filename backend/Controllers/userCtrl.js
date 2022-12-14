const User = require("../DBmodels/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");
const cloudinary = require("../Utils/cloudinary");
const sendToken = require("../Utils/jwtToke");
const ErrorHandler = require("../Utils/errorHandler");

const userCtrl = {
  register: async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, email, password, phone, showPhone } = req.body;

      if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill in all fields.", 400));
      }

      if (!validateEmail(email)) {
        return next(new ErrorHandler("Invalid email.", 400));
      }
      if (phone && !validatePhoneNumber(phone)) {
        return next(new ErrorHandler("Invalid mobile number.", 400));
      }
      const user = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      });
      if (user)
        return next(new ErrorHandler("This account already exist", 400));

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        name,
        email,
        password: passwordHash,
        phone: { showPhone, phone },
      };

      const activation_token = createActivationToken(newUser);
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      console.log(url, "\n\n");
      //send this url to email for verification
      const obj = { name, email, url, txt: "Verify your email address" };
      // sendMail(obj);
      return res.status(201).json({
        message: `An activation link is send to your email!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  activateEmail: async (req, res, next) => {
    try {
      const { activation_token } = req.params;

      // this will decrypt our token into object;
      const user = jwt.verify(
        activation_token,
        process.env.JWT_ACTIVATION_TOKEN_SECRET
      );

      console.log("under route", user);
      const { name, email, password, phone } = user;

      const check = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      });
      if (check) {
        return next(new ErrorHandler("This email already exist.", 400));
      }
      const newUser = new User({
        name,
        email,
        password,
        phone,
      });
      await newUser.save();
      sendToken(newUser, 201, res, "Account has been activated!");
      return;
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please fill in all fields.", 400));
      }

      const user = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Password is incorrect.", 400));
      }
      // save cookies to browser
      sendToken(user, 200, res, "Login success.");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  // Get User Detail / load user
  loadUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("not logged In", 400));
      }
      res.json({ user: user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
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

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      });
      if (!user) {
        return next(new ErrorHandler("Invalid email.", 400));
      }
      // creacte access token and send it to mail
      const reset_token = createResetToken({ email });
      const url = `${process.env.CLIENT_URL}/user/reset/${reset_token}`;
      const { name } = user;
      user.resetPasswordToken = reset_token;
      user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      await user.save();
      sendMail({ name, email, url, txt: "Reset your password" });
      res
        .status(200)
        .json({ message: "Reset link sent, please check your email." });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { password } = req.body;
      const { reset_token } = req.params;
      const passwordHash = await bcrypt.hash(password, 12);
      const { email } = jwt.verify(
        reset_token,
        process.env.JWT_RESET_TOKEN_SECRET
      );
      const user = await User.findOne({
        email: { $regex: new RegExp(email, "i") },
      }).select("+password");
      if (
        !user ||
        !user.resetPasswordExpire ||
        Date.now > user.resetPasswordExpire
      ) {
        return next(new ErrorHandler("Invalid link!", 400));
      }
      user.password = passwordHash;
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      await user.save();
      sendToken(user, 201, res, "Password successfully changed!");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id).select("+password");

      const isMatch = await user.comparePassword(oldPassword);

      if (!isMatch) {
        return next(new ErrorHandler("Old Password is incorrect.", 400));
      }
      passwordHash = await bcrypt.hash(newPassword, 12);
      user.password = passwordHash;
      await user.save();

      return res.status(201).json({ msg: "Password changed successfully!" });
    } catch (err) {
      res.json({ msg: err.message });
    }
  },

  getUserInfor: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        next(new ErrorHandler("User not found.", 400));
      }
      res.json({ msg: user });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  // getMyInfor: async (req, res, next) => {
  //   try {
  //     const user = await User.findById(req.user.id);
  //     if (!user) {
  //       next(new ErrorHandler("Invalid user", 400));
  //     }
  //     res.json({ msg: user });
  //   } catch (error) {
  //     return res.status(500).json(error.message);
  //   }
  // },

  getUsersAllInfor: async (req, res, next) => {
    try {
      const user = await User.find();
      res.json({ user });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  logout: async (req, res, next) => {
    try {
      res.clearCookie("jwtToken");
      return res.status(200).json({ message: "User Logged out." });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  // unseen code
  updateUser: async (req, res, next) => {
    try {
      const { name, phone } = req.body;
      console.log(phone);
      if (phone.phone && !validatePhoneNumber(phone.phone)) {
        console.log(phone.phone);
        return next(new ErrorHandler("Invalid phone number", 400));
      }
      const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      return res.json({ message: "Update success!", user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  },

  updateUserRole: async (req, res, next) => {
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

  deleteUser: async (req, res, next) => {
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

  uploadAvatar: async (req, res, next) => {
    try {
      console.log(req.body);
      const { url, public_id } = req.body;
      const user = await User.findById(req.user.id);
      const imgId = user.avatar.public_id;
      if (imgId) {
        // destroy the photo on cloud
        await cloudinary.v2.uploader.destroy(imgId);
      }
      user.avatar.url = url;
      user.avatar.public_id = public_id;
      user.save();
      return res.json({ sucess: true });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
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
