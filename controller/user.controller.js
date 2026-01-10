
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