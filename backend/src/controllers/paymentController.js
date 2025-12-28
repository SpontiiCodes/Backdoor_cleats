const crypto = require('crypto');

exports.handlePayment = (req, res) => {
  const { pf_payment_id, payment_status, item_name, amount_gross, custom_str1 } = req.body;
  // Verify payment
  const passphrase = process.env.PAYFAST_PASSPHRASE;
  const data = Object.keys(req.body).sort().reduce((acc, key) => {
    if (key !== 'signature') acc += key + '=' + encodeURIComponent(req.body[key]) + '&';
    return acc;
  }, '');
  const signature = crypto.createHash('md5').update(data + 'passphrase=' + passphrase).digest('hex');
  if (signature === req.body.signature && payment_status === 'COMPLETE') {
    // Update order status
    // res.status(200).send('Payment successful');
  } else {
    // res.status(400).send('Payment failed');
  }
  res.sendStatus(200);
};