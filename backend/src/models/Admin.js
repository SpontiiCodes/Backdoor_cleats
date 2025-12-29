const pool = require('../config/db');
const { hashPassword, verifyPassword } = require('../middleware/auth');

class Admin {
  static async create(adminData) {
    const { email, password, name } = adminData;
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO admins (email, password, name) VALUES ($1, $2, $3) RETURNING id, email, name, role, created_at',
      [email, hashedPassword, name]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM admins WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async verifyCredentials(email, password) {
    const admin = await this.findByEmail(email);
    if (!admin) return null;

    const isValidPassword = await verifyPassword(password, admin.password);
    if (!isValidPassword) return null;

    // Return admin without password
    const { password: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }

  static async getAll() {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM admins ORDER BY created_at DESC'
    );
    return result.rows;
  }
}

module.exports = Admin;