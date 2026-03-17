const express = require("express");
const authController = require("../controllers/auth.controller");
const validateMW = require("../middlewares/validateMW");
const userAuthSchema = require("../utils/userAuth.schema");
const userRegistrationSchema = require("../utils/userRegistration.schema");

const router = express.Router();

// 1) user registration:
router.post("/register", validateMW(userRegistrationSchema), authController.registerUser);

// 2) user login:
router.post("/login", validateMW(userAuthSchema), authController.userLogin);

// 3) refresh token:
router.get("/refresh", authController.updateRefreshToken);

// 4) user logout:
router.post("/logout", authController.userLogout);

module.exports = router;
