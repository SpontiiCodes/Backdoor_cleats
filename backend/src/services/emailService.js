const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  static async sendOrderConfirmation(order, customerEmail, customerName, items) {
    const itemsList = items.map(item =>
      `<li>${item.name} - Quantity: ${item.quantity} - R${item.price}</li>`
    ).join('');

    const msg = {
      to: customerEmail,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'Backdoor Cleats'
      },
      subject: `Order Confirmation - Order #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank you for your order, ${customerName}!</h1>
          <p>Your order has been successfully placed.</p>

          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Total:</strong> R${order.total}</p>
            <p><strong>Status:</strong> ${order.status}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Items Ordered:</h3>
            <ul>
              ${itemsList}
            </ul>
          </div>

          <p>You will receive another email once your payment has been confirmed and your order is being processed.</p>

          <p>If you have any questions, please contact us at ${process.env.FROM_EMAIL}</p>

          <p>Best regards,<br>The Backdoor Cleats Team</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  }

  static async sendPaymentConfirmation(order, customerEmail, customerName) {
    const msg = {
      to: customerEmail,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'Backdoor Cleats'
      },
      subject: `Payment Confirmed - Order #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Payment Confirmed!</h1>
          <p>Hi ${customerName},</p>
          <p>Your payment for Order #${order.id} has been successfully processed.</p>

          <div style="background-color: #d4edda; padding: 20px; margin: 20px 0; border-radius: 5px; border: 1px solid #c3e6cb;">
            <h3>What's Next?</h3>
            <p>Your order is now being prepared for shipping. You will receive a shipping confirmation email with tracking details once your order ships.</p>
          </div>

          <p>Thank you for shopping with Backdoor Cleats!</p>

          <p>Best regards,<br>The Backdoor Cleats Team</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
      console.log('Payment confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);
      throw error;
    }
  }

  static async sendShippingConfirmation(order, customerEmail, customerName, trackingNumber) {
    const msg = {
      to: customerEmail,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'Backdoor Cleats'
      },
      subject: `Your Order Has Shipped - Order #${order.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Your Order Has Shipped!</h1>
          <p>Hi ${customerName},</p>
          <p>Great news! Your order #${order.id} has been shipped and is on its way to you.</p>

          <div style="background-color: #d1ecf1; padding: 20px; margin: 20px 0; border-radius: 5px; border: 1px solid #bee5eb;">
            <h3>Shipping Details:</h3>
            <p><strong>Tracking Number:</strong> ${trackingNumber || 'To be provided soon'}</p>
            <p><strong>Carrier:</strong> To be confirmed</p>
          </div>

          <p>You can track your package using the tracking number above.</p>
          <p>Estimated delivery: 3-5 business days</p>

          <p>If you have any questions, please contact us at ${process.env.FROM_EMAIL}</p>

          <p>Best regards,<br>The Backdoor Cleats Team</p>
        </div>
      `
    };

    try {
      await sgMail.send(msg);
      console.log('Shipping confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending shipping confirmation email:', error);
      throw error;
    }
  }
}

module.exports = EmailService;