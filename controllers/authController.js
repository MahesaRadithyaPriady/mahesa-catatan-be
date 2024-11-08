const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Get All Users",
    data: users,
  });
};

exports.storeUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username == "" || password == "") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Username and Password is required",
    });
  }
  try {
    const user = await User.create({
      username,
      password,
    });
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User Created",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Username and Password is required",
    });
  }
  const userData = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (
    !userData ||
    !(await userData.correctPassword(req.body.password, userData.password))
  ) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Incorrect username or password",
    });
  }
  const token = signToken(userData.id);
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Login Success",
    data: userData,
    token,
  });
};

exports.jwtVerify = (req, res) => {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Login Success",
  });
};
