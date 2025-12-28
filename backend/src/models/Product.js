const pool = require('../config/db');

class Product {
  static async getAll(category) {
    const query = category ? 'SELECT * FROM products WHERE category = $1' : 'SELECT * FROM products';
    const values = category ? [category] : [];
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateStock(id, size, quantity) {
    // Update stock logic
  }
}

module.exports = Product;