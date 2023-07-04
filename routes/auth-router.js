const Router = require("express");
const controller = require("../controllers/auth-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleWare = require("../middleware/auth-middleware");

router.post(
  "/registration",
  [
    body("email", "Email can not be empty").not().isEmpty(),
    body("email", "This is not an email").isEmail(),
    body("password", "Password can not be least than 6 symbols").isLength({
      min: 6,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/refresh", controller.refresh);
router.delete("", authMiddleWare, controller.delete);

module.exports = router;
