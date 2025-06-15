const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    // ✅ At this point, Joi has already validated req.body
    const { username, email, password} = req.body;

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      const error = new Error("User already exist");
      error.statusCode = 404;
      throw error; // This will be caught by the errorHandler
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: "User successfully created",
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } else {
      const error = new Error("User credentials not valid");
      error.statusCode = 400;
      throw error; // This will be caught by the errorHandler
    }
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    // ✅ At this point, Joi has already validated req.body
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
            role:user.role
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        status: true,
        message: "User login successfully",
        token,
      });
    } else {
      const error = new Error("Invalid email/password");
      error.statusCode = 401;
      throw error; // This will be caught by the errorHandler
    }
  } catch (error) {
    next(error);
  }
};

const currentUser = async(req, res)=>{
    res.json({
        message: "Current user info",
        user: req.user
    })
}

module.exports = { registerUser, loginUser, currentUser };
