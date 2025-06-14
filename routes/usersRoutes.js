const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const JoiValidator = require("../middlewares/JoiValidator");
const registerSchema = require("../utils/schemas/registerSchema");
const loginSchema = require("../utils/schemas/loginSchema");
const router = Router();

// register
router.post(
  "/register",
  JoiValidator(registerSchema),
  usersController.register
);

// login
router.post("/login", JoiValidator(loginSchema), usersController.login);

// get all users
router.get(
  "/",
  authenticate,
  authorize(["user", "admin"]),
  usersController.getAllUsers
);
router.get("/:id", usersController.getUserById);
router.patch("/:id", usersController.updateUserById);
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
