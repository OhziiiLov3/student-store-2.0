const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");


router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

// custom endpoints to add items and total
router.post("/:orderId/items", orderController.addItemToOrder);
router.get("/:orderId/total", orderController.calculateOrderTotal);

module.exports = router;
