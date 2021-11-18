const nodemailer = require('nodemailer');
const getEmailTemplate = require('./getEmailTemplate');

module.exports = async function sendEmail(coins) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: '"KuCoin bot" <crypto.russ.hanneman@gmail.com>',
    to: 'mariusz0689@gmail.com',
    bcc: process.env.RECIPIENTS,
    subject: `🤑  New  ${coins.length} ${coins.length > 1 ? 'coins' : 'coin'} on KuCoin at ${new Date().toLocaleString()} 🤑`,
    html: getEmailTemplate(coins)
  });

  return info;
};
