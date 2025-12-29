const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

// Get all orders (admin only)
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.id,
        o.total,
        o.status,
        o.created_at,
        u.name as customer_name,
        u.email as customer_email,
        json_agg(
          json_build_object(
            'product_id', oi.product_id,
            'size', oi.size,
            'quantity', oi.quantity,
            'product_name', p.name,
            'product_price', p.price
          )
        ) as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/orders/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.updateStatus(id, status);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products (admin only)
router.get('/products', authenticateToken, async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (admin only)
router.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.update(id, updates);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product (admin only)
router.post('/products', authenticateToken, async (req, res) => {
  try {
    const { name, category, price, sizes, stock, image_url, description } = req.body;

    const result = await pool.query(
      'INSERT INTO products (name, category, price, sizes, stock, image_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category, price, sizes, stock, image_url, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (admin only)
router.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard stats (admin only)
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Get order stats
    const orderStats = await pool.query(`
      SELECT
        COUNT(*) as total_orders,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_orders,
        SUM(CASE WHEN status != 'cancelled' THEN total ELSE 0 END) as total_revenue
      FROM orders
    `);

    // Get product stats
    const productStats = await pool.query(`
      SELECT
        COUNT(*) as total_products,
        SUM(stock) as total_stock
      FROM products
    `);

    res.json({
      orders: orderStats.rows[0],
      products: productStats.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;