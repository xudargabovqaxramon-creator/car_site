
const AuthSchema = require("../schema/auth.schema")
const CustomErrorHandler = require("../utils/custom-error-handler");


const updateMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { full_name, avatar, phone } = req.body;

    const user = await AuthSchema.findById(userId);
    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    if (full_name) user.full_name = full_name;
    if (avatar) user.avatar = avatar;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user,
    });
  } catch (error) {
    next(error);
  }
};


const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id
    
    const user = await AuthSchema.findById(userId).select("-password");

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// LOG OUT
const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({ message: "Logged out" })
  } catch (error) {
    next(error);
  }
};
// Forgot Password

const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, new_password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });
    
        if (!foundedUser) {
          throw CustomErrorHandler.UnAuthorized("User not found");
          
        }

    if (foundedUser.otpTime < Date.now()) {
    throw CustomErrorHandler.BadRequest("OTP expired");
}

    if (foundedUser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("Wrong OTP");
    }

    if (!foundedUser.isVerified) {
      throw CustomErrorHandler.UnAuthorized("User was not verified");
    }

    const hashPassword = await bcrypt.hash(new_password, 12);

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      password: hashPassword,
      otp: null,
      otpTime: null,
    });

    res.status(200).json({
      message: "Password successfully updated",
    });
  } catch (error) {
    next(error);
  }
};


const changepassword = async (req, res, next) =>{
  try {
    const { current_password, new_password, confirm_password} = req.body


    const UserId = req.user.id
    if (new_password !== confirm_password) {
      throw CustomErrorHandler.BadRequest("new_password and confirm_password must be same")
    }

    
    if (new_password === current_password) {
      throw CustomErrorHandler.BadRequest("New password must be different from current password")
    }

    const foundedUser = await AuthSchema.findById(UserId)

    
    if ( !foundedUser) {
      throw CustomErrorHandler.NotFound("user not found")
    }

    const compare = await bcrypt.compare(current_password, foundedUser.password)
if (!compare) {
  throw CustomErrorHandler.UnAuthorized("Current password is wrong");
}


    if (compare) {
      const hashpassword = await bcrypt.hash(new_password,12)
      await AuthSchema.findByIdAndUpdate(foundedUser._id,{password:hashpassword})
      return res.status(200).json({
        message: "success"
      }) 
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  forgotPassword,
  changepassword,
  logout,
  getMe,
  updateMe
}