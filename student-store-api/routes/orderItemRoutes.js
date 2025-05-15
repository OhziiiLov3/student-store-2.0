const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");


router.post('/', orderItemController.createOrderItem);
router.get("/:orderId", orderItemController.getOrderItemsByOrderId);




module.exports = router;