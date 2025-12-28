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

  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async updateStock(id, size, quantity) {
    // Update stock logic
  }
}

module.exports = Product;