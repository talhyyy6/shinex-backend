const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/book', async (req, res) => {
  const { name, phone, location, service, preferredTime } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New ShineX Booking',
    text: `
      Name: ${name}
      Phone: ${phone}
      Location: ${location}
      Service: ${service}
      Preferred Time: ${preferredTime}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Booking received! We’ll contact you shortly.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to send booking.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
