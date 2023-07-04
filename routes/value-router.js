const Router = require("express");
const controller = require("../controllers/value-controller");
const router = new Router();
const authMiddleWare = require("../middleware/auth-middleware");

router.get("", authMiddleWare, controller.getAll);
router.get("/:id", authMiddleWare, controller.getOne);
router.post("/", authMiddleWare, controller.create);
router.put("/:id", authMiddleWare, controller.edit);
router.delete("/:id", authMiddleWare, controller.delete);

module.exports = router;
