const express = require("express");
const router = express.Router();
const authMiddleware = require("./middleware/auth.middleware");
const athleteMiddleware = require("./middleware/athlete.middleware");

const authController = require("./controller/auth.controller");
const athleteController = require("./controller/athlete.controller");

// ######################### AUTH ROUTER #############################
router.get("/auth", authMiddleware.auth, authController.getUser);
router.post(
  "/auth/register",
  authMiddleware.register,
  authController.registerUser
);
router.post("/auth/login", authMiddleware.login, authController.login);

// ######################### AUTH ROUTER #############################
router.get("/sports", athleteController.getSports);

// ######################### ATHLETE ROUTER #############################
//router.post('/athlete/save', authMiddleware.auth, athleteMiddleware.upload.single('file'), athleteMiddleware.save, athleteController.save)
router.post(
  "/athlete/save",
  authMiddleware.auth,
  athleteMiddleware.save,
  athleteController.save
);
router.get("/athlete/list", authMiddleware.auth, athleteController.getList);

module.exports = router;
