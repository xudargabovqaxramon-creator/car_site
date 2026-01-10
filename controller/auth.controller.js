const bcrypt = require("bcryptjs");
const CustomErrorHandler = require("../utils/custom-error-handler");
const { accessToken, refreshToken } = require("../utils/create-token");
const emailSender = require("../utils/email-sender");
const AuthSchema = require("../schema/auth.schema");

const register = async (req, res, next) => {
  try {
    const { user_name, email, password } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (foundeduser) {
      throw CustomErrorHandler.Conflict(" User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const otpTime = Date.now() + 120000;

    await AuthSchema.create({
      user_name,
      email,
      password: hashPassword,
      otp: randomNumbers,
      otpTime,
    });

    await emailSender(randomNumbers, email);

    res.status(201).json({
      message: "registerd!",
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandler.NotFound(" user not found");
    }

    const time = Date.now();

    if (foundeduser.otpTime < time) {
      throw CustomErrorHandler.BadRequest("otp time expired");
    }

    if (foundeduser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("Wrong otp");
    }

    await AuthSchema.findByIdAndUpdate(foundeduser._id, {
      isVerified: true,
      otp: null,
      otpTime: null,
    });

    const payload = {
      user_name: foundeduser.user_name,
      email: foundeduser.email,
      role: foundeduser.role,
      id: foundeduser._id,
    };

    const access_token = accessToken(payload);
    const refresh_token = refreshToken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 15,
    });

    res.status(200).json({
      message: "Success",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

// resend code

const resendCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    await emailSender(randomNumbers, email);

    const otptime = Date.now() + 120000;

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: randomNumbers,
      otpTime: otptime,
    });

    res.status(201).json({
      message: "Kod qayta yuborildi va u ikki daqiqa kuchga ega",
      randomNumbers,
    });
  } catch (error) {
    next(error);
  }
};

// LOG IN

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandler.NotFound(" User not found");
    }
    if (!foundeduser.isVerified) {
      throw CustomErrorHandler.UnAuthorized("Account not verified");
    }

    const compare = await bcrypt.compare(password, foundeduser.password);

    if (compare && foundeduser.isVerified) {
      const payload = {
        user_name: foundeduser.user_name,
        email: foundeduser.email,
        role: foundeduser.role,
        id: foundeduser._id,
      };

      const access_token = accessToken(payload);
      const refresh_token = refreshToken(payload);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 3600 * 1000 * 24 * 15,
      });

      res.status(200).json({
        message: "Success",
        access_token,
      });
    } else {
      throw CustomErrorHandler.UnAuthorized("Invalid password");
    }
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

    if (foundedUser.otpTime < Date.now()) {
    throw CustomErrorHandler.BadRequest("OTP expired");
}


    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
      
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






module.exports = {
  register,
  resendCode,
  Login,
  verify,
  logout,
  forgotPassword,
};
