const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

const { authenticate, authorize } = require("../middleware/authMiddleware");
router.post(
  "/addtocart/:productId",
  authenticate,
  authorize("customer"),
  cartController.addtocart
);
router.delete(
  "/deleteElementInCart/:userId/:productId",
  authenticate,
  authorize("customer"),
  cartController.deleteincart
);
// router.delete("/deleteallcart",authenticate, authorize("customer"), cartController.deleteallcart);
router.delete(
  "/deleteAllCart/:userId",
  authenticate,
  authorize("customer"),
  cartController.deleteallcart
);
module.exports = router;
