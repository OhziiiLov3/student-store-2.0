const { PrismaClient } = require("@prisma/client");
const { get } = require("../routes/productRoutes");
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


module.exports ={
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}