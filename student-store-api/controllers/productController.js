const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// create a product

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

// get all products
const getAllProducts = async (req, res) => {

  // try {
  //   const products = await prisma.product.findMany();
  //   console.log(products);
  //   res.json(products);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
   const { sort, category } = req.query;

  let filters = {};
  if (category) {
    filters.category = {
       equals: category,
       mode: "insensitive"
    };
  }

  let orderBy = {};
  if (sort === "price") {
    orderBy.price = "asc";
  } else if (sort === "name") {
    orderBy.name = "asc";
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    });
    res.json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// get product by id

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category } = req.body;

  try {
    const updated = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, imageUrl, category },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Product not found or update failed." });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Product not found or delete failed." });
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
