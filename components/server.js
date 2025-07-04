require('dotenv').config({ path: 'C:/Users/maria/supermarket-prices/DONOTCOMMIT.env' });
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Expo } = require('expo-server-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PRICE_HISTORY_FILE = path.join(__dirname, 'priceHistory.json');

const loadPriceHistoryFromFile = () => {
  try {
    if (fs.existsSync(PRICE_HISTORY_FILE)) {
      const raw = fs.readFileSync(PRICE_HISTORY_FILE);
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading price history file:', err);
  }
  return {};
};

const savePriceHistoryToFile = () => {
  try {
    fs.writeFileSync(PRICE_HISTORY_FILE, JSON.stringify(priceHistory, null, 2));
  } catch (err) {
    console.error('Error writing price history file:', err);
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let expo = new Expo();

let subscribedUsers = [
  { email: 'rperson416@gmail.com', subscribed: true },
];

let subscribedDeviceTokens = [/*'ExponentPushToken[90oUbsNaXF4howvQB3qEA9]',*/ 'ExponentPushToken[ysDHZNBnI4yL2fBCsXJLy1]'];

/**
 * 
 * @param {string[]} tokens - Array of Expo push tokens
 * @param {string} message 
 */

async function sendPushNotifications(tokens, message) {
  let messages = [];

  const tokens2 = tokens.map(item => typeof item === 'object' ? item.token : item);
  for (let pushToken of tokens2) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      title: "Price Reduced",
      body: message,
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      let tickets = await expo.sendPushNotificationsAsync(chunk);
      console.log('Sent notification chunk:', tickets);
    } catch (error) {
      console.error('Error sending notification chunk:', error);
    }
  }
}


app.post('/admin/price-reduction', async (req, res) => {
  try {
    const { productId, newPrice } = req.body;

    // Send push notifications to all subscribed users
    const message = `Price reduced for product ${productId}! New price: ${newPrice}€`;
    await sendPushNotifications(subscribedDeviceTokens, message);

    res.status(200).json({ success: true, message: 'Price reduced and notifications sent.' });
  } catch (error) {
    console.error('Error processing price reduction:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

let userWatchlists = {

};

app.post('/save-watchlist', (req, res) => {
  const { email, watchlist } = req.body;

  if (!email || !watchlist) {
    return res.status(400).json({ success: false, message: 'Missing email or watchlist.' });
  }

  userWatchlists[email] = watchlist; 

  console.log(`Updated watchlist for ${email}`, watchlist);
  res.json({ success: true, message: 'Watchlist updated successfully.' });
});

app.post('/admin/price-increase', async (req, res) => {
  try {
    const { productId, newPrice, productName, storeName } = req.body;

    let interestedTokens = [];

    for (const userEmail in userWatchlists) {
      const watchlist = userWatchlists[userEmail] || [];

      const isWatching = watchlist.some(idOrProduct => {
        if (typeof idOrProduct === 'string') {
          return idOrProduct.includes(productName); 
        }
        return idOrProduct.name === productName; 
      });

      if (isWatching) {
        interestedTokens.push(...subscribedDeviceTokens);
      }
    }

    if (interestedTokens.length === 0) {
      console.log('No users to notify for this price increase.');
      return res.status(200).json({ success: true, message: 'No users interested.' });
    }

    const message = `Price increased for ${productName} at ${storeName}: €${newPrice}`;

    await sendPushNotifications(interestedTokens, message);

    res.status(200).json({ success: true, message: 'Price increase notifications sent.' });
  } catch (error) {
    console.error('Error processing price increase:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.post('/register-push-token', (req, res) => {
  const { token, userIdentifier } = req.body;

  console.log(`Received push token for user ${userIdentifier}:`, token);

  if (token && !subscribedDeviceTokens.includes(token)) {
    subscribedDeviceTokens.push(token);
  }

  res.json({ success: true, message: 'Push token registered successfully.' });
});

let priceHistory = loadPriceHistoryFromFile();

app.post('/save-price-history', (req, res) => {
  const { productName, storeName, price, date } = req.body;

  if (!priceHistory[productName]) {
    priceHistory[productName] = {};
  }
  if (!priceHistory[productName][storeName]) {
    priceHistory[productName][storeName] = [];
  }

  priceHistory[productName][storeName].unshift({ date, price });
  savePriceHistoryToFile();
  console.log('Updated price history:', JSON.stringify(priceHistory, null, 2));
  console.log('Received save-price-history:', req.body);

  res.json({ success: true, message: 'Price history saved.' });
});

app.get('/get-price-history', (req, res) => {
  const { productName } = req.query;
  const history = priceHistory[productName] || {};
  res.json({ success: true, history });
});

/**
 * Endpoint to handle leaflet upload and email notifications
 */
app.post('/upload-leaflet', upload.single('leaflet'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No leaflet uploaded!' });
    }

    const leafletBuffer = req.file.buffer;
    const leafletPath = path.join(__dirname, 'leaflet.jpg');
    fs.writeFileSync(leafletPath, leafletBuffer);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      subject: 'New Supermarket Leaflet Available!',
      text: 'A new leaflet has been uploaded to ShopSmart. Find the latest prices inside!',
      attachments: [{ filename: 'leaflet.jpg', content: leafletBuffer }],
    };

    // Send emails to subscribed users
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

// Start the server
app.listen(5003, () => console.log('Server running on port 5003'));