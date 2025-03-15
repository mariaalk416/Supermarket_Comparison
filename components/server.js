require('dotenv').config({ path: 'C:/Users/maria/supermarket-prices/DONOTCOMMIT.env' });
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { subscribe } = require('diagnostics_channel');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Loaded');
let subscribedUsers = [
  { email: 'rperson416@gmail.com', subscribed: true},
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

app.post('/upload-leaflet', upload.single('leaflet'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No leaflet uploaded!' });
    }

    const leafletBuffer = req.file.buffer;
    const leafletPath = path.join(__dirname, 'leaflet.jpg');
    fs.writeFileSync(leafletPath, leafletBuffer);

    // Email body
    const mailOptions = {
      from: process.env.EMAIL_USER,
      subject: 'New Supermarket Leaflet Available!',
      text: 'A new leaflet has been uploaded to ShopSmart. Find the latest prices inside!',
      attachments: [{ filename: 'leaflet.jpg', content: leafletBuffer }],
    };

    subscribedUsers
      .filter(user => user.subscribed)
      .forEach(user => {
        transporter.sendMail({ ...mailOptions, to: user.email }, (error, info) => {
          if (error) console.error(`Error sending to ${user.email}:`, error);
          else console.log(`Email sent to ${user.email}:`, info.response);
        });
      });

    res.json({ message: 'Leaflet uploaded & emails sent!' });
  } catch (error) {
    console.error('Error processing leaflet upload:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(5002, () => console.log('Server running on port 5002'));
