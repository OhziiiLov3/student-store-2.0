const { PrismaClient } = require("@prisma/client");
const { get } = require("../routes/productRoutes");
const prisma = new PrismaClient();





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



module.exports ={
    createOrder,
    getAllOrders
}