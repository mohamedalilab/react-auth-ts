const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const asyncFunction = require("../middlewares/asyncFunction");
const User = require("../models/User");
const EXPIRES_LIST = require("../config/expires_list");
const genTokens = require("../utils/genTokens");

// 1) user registration:
const registerUser = asyncFunction(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. check if email already exists:
  const emailExist = await User.findOne({ email }).exec();
  if (emailExist) {
    return res
      .status(409)
      .json({ message: `Email "${email}" has been already taken!` });
  }

  // 2. hash password:
  const salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);

  // 3. create new user:
  const newUser = await User.create({
    name,
    email,
    password: hashPwd,
    role: "user", // Default role
  });

  // 4. generate tokens:
  const payload = {
    userId: newUser._id.toString(),
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
  };
  const { accessToken, refreshToken } = genTokens(payload);

  // 5. save refreshToken in user:
  newUser.refreshToken = [refreshToken];
  await newUser.save();

  // 6. send response matching frontend format:
  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    },
  });
});

// 2) user login:
const userLogin = asyncFunction(async (req, res) => {
  const { email, password } = req.body;

  // 1. find user:
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // 2. check password:
  const isValidPwd = await bcrypt.compare(password, foundUser.password);
  if (!isValidPwd) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  // 3. check if there's jwt cookie & remove it from user:
  const jwtCookie = req.cookies?.jwt;
  let newRefreshTokenArr = !jwtCookie
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt !== jwtCookie);

  // 4. detect token reuse:
  if (jwtCookie) {
    const foundToken = await User.findOne({ refreshToken: jwtCookie }).exec();
    if (!foundToken) {
      newRefreshTokenArr = [];
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: EXPIRES_LIST.jwtCookie,
      sameSite: "None",
      secure: true,
    });
  }

  // 5. generate new tokens:
  const payload = {
    userId: foundUser._id.toString(),
    email: foundUser.email,
    name: foundUser.name,
    role: foundUser.role,
  };
  const { accessToken, refreshToken: newRefreshToken } = genTokens(payload);

  // 6. save refreshToken in user:
  foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
  await foundUser.save();

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: false, // 🔴 IMPORTANT for localhost
    sameSite: "lax", // 🔴 IMPORTANT for localhost
    maxAge: EXPIRES_LIST.jwtCookie,
    path: "/",
  });

  // 7. send response matching frontend format:
  res.json({
    accessToken,
    refreshToken: newRefreshToken,
    user: {
      id: foundUser._id.toString(),
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
    },
  });
});

// 3) refresh token:
const updateRefreshToken = asyncFunction(async (req, res) => {
  // 1. get refreshToken from body (frontend sends it):
  const { refreshToken: refreshTokenFromBody } = req.body;

  // Also check cookies as fallback:
  const refreshToken = refreshTokenFromBody || req.cookies?.jwt;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided!" });
  }
  // 2. find user by token:
  const foundUser = await User.findOne({ refreshToken }).exec();

  // 3. detect token reuse:
  if (!foundUser) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN
      );
      // Remove all tokens from hacked user:
      const hackedUser = await User.findOne({ email: decoded.email }).exec();
      if (hackedUser) {
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    } catch (err) {
      // Token is invalid
    }
    return res
      .status(403)
      .json({ message: "Invalid or reused refresh token!" });
  }

  // 4. filter refresh tokens:
  const newRefreshTokenArr = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // 5. verify token:
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_TOKEN,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArr];
        await foundUser.save();
        return res.status(403).json({ message: "Invalid refresh token!" });
      }

      // 6. check if user ID matches:
      if (foundUser._id.toString() !== decoded.userId) {
        return res.status(403).json({ message: "Invalid token!" });
      }
      // 7. generate new tokens:
      const payload = {
        userId: foundUser._id.toString(),
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      };
      const { accessToken, refreshToken: newRefreshToken } = genTokens(payload);

      // 8. save refreshToken in DB:
      foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      await foundUser.save();

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: false, // 🔴 IMPORTANT for localhost
        sameSite: "lax", // 🔴 IMPORTANT for localhost
        maxAge: EXPIRES_LIST.jwtCookie,
        path: "/",
      });

      // 9. send response matching frontend format:
      res.json({
        accessToken,
        user: {
          id: foundUser._id.toString(),
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        },
      });
    }
  );
});

// 4) user logout:
const userLogout = asyncFunction(async (req, res) => {
  // 1. get refreshToken:
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) {
    return res.sendStatus(204);
  } // 2. clear jwt cookie:
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: EXPIRES_LIST.jwtCookie,
    sameSite: "None",
    secure: true,
  });
  // 3. find user & remove refreshToken:
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (foundUser) {
    console.log(foundUser.refreshToken.length);
    foundUser.refreshToken = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    await foundUser.save();
  }

  // 4. send response:
  res.json({ message: "Logged out successfully!" });
});

module.exports = {
  registerUser,
  userLogin,
  updateRefreshToken,
  userLogout,
};
