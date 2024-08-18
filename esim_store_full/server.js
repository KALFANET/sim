
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ACCESS_CODE = 'f7ef3e8d68d649c89c22e3bebb9fa0c0';
const SECRET_KEY = '9e90b43365f641038bb2c733ae73018d';
const API_URL = 'https://api.esimaccess.com/api/v1/open';

// פונקציה ליצירת חתימה (Signature)
function createSignature(requestBody, timestamp, requestId) {
    const signData = timestamp + requestId + ACCESS_CODE + requestBody;
    return crypto.createHmac('sha256', SECRET_KEY).update(signData).digest('hex').toLowerCase();
}

// פונקציה לקבלת רשימת חבילות לפי מדינה
app.post('/api/packages', async (req, res) => {
    const { country } = req.body;
    const timestamp = Date.now().toString();
    const requestId = crypto.randomUUID();
    const requestBody = JSON.stringify({
        locationCode: country,
        type: 'BASE',
    });
    const signature = createSignature(requestBody, timestamp, requestId);

    try {
        const response = await axios.post(`${API_URL}/package/list`, JSON.parse(requestBody), {
            headers: {
                'RT-AccessCode': ACCESS_CODE,
                'RT-RequestID': requestId,
                'RT-Signature': signature,
                'RT-Timestamp': timestamp,
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages', error: error.message });
    }
});

// פונקציה לרכישת חבילה
app.post('/api/purchase', async (req, res) => {
    const { packageCode, count, transactionId } = req.body;
    const timestamp = Date.now().toString();
    const requestId = crypto.randomUUID();
    const requestBody = JSON.stringify({
        transactionId: transactionId,
        packageInfoList: [{ packageCode, count }]
    });
    const signature = createSignature(requestBody, timestamp, requestId);

    try {
        const response = await axios.post(`${API_URL}/esim/order`, JSON.parse(requestBody), {
            headers: {
                'RT-AccessCode': ACCESS_CODE,
                'RT-RequestID': requestId,
                'RT-Signature': signature,
                'RT-Timestamp': timestamp,
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing package', error: error.message });
    }
});

// פונקציה לקבלת מידע על הזמנה קיימת
app.post('/api/order', async (req, res) => {
    const { orderNo } = req.body;
    const timestamp = Date.now().toString();
    const requestId = crypto.randomUUID();
    const requestBody = JSON.stringify({
        orderNo: orderNo
    });
    const signature = createSignature(requestBody, timestamp, requestId);

    try {
        const response = await axios.post(`${API_URL}/esim/query`, JSON.parse(requestBody), {
            headers: {
                'RT-AccessCode': ACCESS_CODE,
                'RT-RequestID': requestId,
                'RT-Signature': signature,
                'RT-Timestamp': timestamp,
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
