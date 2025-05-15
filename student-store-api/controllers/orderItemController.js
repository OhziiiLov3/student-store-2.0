const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// Create Order Item

const createOrderItem = async (req, res) => {
  const { orderId, productId, price, quantity } = req.body;

  if (!orderId || !productId || !price || !quantity) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const orderItem = await prisma.orderItem.create({
      data: { orderId, productId, price, quantity },
    });
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all items for a order
const getOrderItemsByOrderId = async (req, res) => {
   const { orderId } = req.params;
  try {
    const orderItem = await prisma.orderItem.findMany({
      where: { orderId: parseInt(orderId) },
    });
    if (orderItem) {
      res.json(orderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  createOrderItem,
  getOrderItemsByOrderId,
};