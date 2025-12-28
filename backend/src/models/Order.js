const pool = require('../config/db');

class Order {
  static async create(orderData) {
    const { user_id, total, status } = orderData;
    const result = await pool.query(
      'INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *',
      [user_id, total, status]
    );
    return result.rows[0];
  }

  static async addItems(orderId, items) {
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, size, quantity) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.size, item.quantity]
      );
    }
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = Order;