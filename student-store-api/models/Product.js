const pool = require("../db");

class Product {
  static async getAll() {
    const res = await pool.query("SELECT * FROM products");
    return res.rows;
  }
}

module.exports = Product;
