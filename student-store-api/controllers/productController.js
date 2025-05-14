const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  console.log(req.body);
    // Basic validation
    if (!name || !description || !price || !imageUrl || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const product = await prisma.product.create({
      data: { name, description, price, imageUrl, category },
    });
     res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createProduct
}