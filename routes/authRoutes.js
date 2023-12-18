const express = require("express");
const router = express.Router();
const rateLimiter = require("express-rate-limit");

const { register, login, logout } = require("../controllers/authController");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});
//, apiLimiter

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.get("/logout", logout);

module.exports = router;
