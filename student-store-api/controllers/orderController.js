const { PrismaClient } = require("@prisma/client");
// const { get } = require("../routes/productRoutes");
const prisma = new PrismaClient();



// create order
const createOrder = async (req,res)=>{
  const { userId, totalPrice, status} = req.body;

 if (!userId || !totalPrice || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }
 try {
    const order = await prisma.order.create({
        data:{
            userId,
            totalPrice,
            status
        }
    })
    res.json(order);
 } catch (error) {
     res.status(500).json({ error: error.message });
 }
};



// Caluclate total price of an order 
const calculateOrderTotal = async (req, res) => {
  const { orderId } = req.params;

  try {

       const orderItems = await prisma.orderItem.findMany({
      where: { orderId: parseInt(orderId) },
    });


    // Calculate total price by summing up the prices of all order items
    const total = orderItems.reduce((acc, item) => {
      return acc + parseFloat(item.price) * item.quantity;
    }, 0);

    // update the order total in DB
    await prisma.order.update({
      where: { orderId: parseInt(orderId) },
      data: { totalPrice: total },
    });

       res.json({ orderId: parseInt(orderId), total });
  } catch (error) {
    console.error("Error calculating order total:", error);
    res.status(500).json({ error: "Internal server error" });
  }
 };


// get all orders 
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get order by id 
const getOrderById = async (req,res)=>{
   const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { orderId: parseInt(id) },
    include: {
        orderItems: {
          include: { product: true },
        },
    },
    });

    if (!order) return res.status(404).json({ error: "Order not found." });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { userId, totalPrice, status } = req.body;
    try {
        const order = await prisma.order.update({
            where: { orderId: parseInt(id) },
            data: { userId, totalPrice, status },
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.delete({
            where: { orderId: parseInt(id) },
        });
        res.json({ message: 'Order deleted', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// add orders items 
const addItemToOrder = async (req, res) => {
  const { orderId } = req.params;
  const { productId, quantity } = req.body;

  try {
 
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the order item
    const item = await prisma.orderItem.create({
      data: {
        orderId: parseInt(orderId),
        productId,
        quantity,
        price: product.price,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports ={
    createOrder,
    calculateOrderTotal,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    addItemToOrder
}