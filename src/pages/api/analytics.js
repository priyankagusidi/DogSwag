// pages/api/analytics.js
import axios from 'axios';

export default async function handler(req, res) {
  const { method, body } = req;

  // Forward the request to the Google Analytics server
  try {
    const response = await axios.request({
      method,
      url: 'https://www.google-analytics.com/mp/collect',
      headers: req.headers,
      data: body,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
