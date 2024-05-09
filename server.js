const express = require('express');
const axios = require('axios');

const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// Proxy endpoint to forward requests to the external API
app.get('/api/proxy', async (req, res) => {
    try {
        // Forward the request to the external API
        const response = await axios.get('https://us5.datadoghq.com/api/v1/monitor', {
            headers: {
                'DD-API-KEY': process.env.DD_API_KEY,
                'DD-APPLICATION-KEY': process.env.DD_APPLICATION_KEY,
                'Content-Type': 'application/json',
            }
        });

        // Send the response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'An error occurred while proxying the request' });
    }
});

// Proxy endpoint to forward POST requests to the external API
app.post('/api/proxy', async (req, res) => {
    console.log(req.body)

    try {
        const { message, name, query, type } = req.body;

        // Forward the POST request to the external API
        const response = await axios.post('https://us5.datadoghq.com/api/v1/monitor', {
            message,
            name,
            query,
            type
        }, {
            headers: {
                'DD-API-KEY': process.env.DD_API_KEY,
                'DD-APPLICATION-KEY': process.env.DD_APPLICATION_KEY,
                'Content-Type': 'application/json',
            }
        });

        // Send the response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error('Error proxying POST request:', error);
        res.status(500).json({ error: 'An error occurred while proxying the POST request' });
    }
});

// Endpoint to handle incoming webhook events from DataDog
app.post('/webhook', async (req, res) => {
    try {
        // Extract the event data from the request body
        const eventData = req.body;
        
        // Process the webhook event (e.g., log it, update state, trigger actions)
        console.log('Received webhook event:', eventData);
        
        // Respond to the webhook request (optional)
        res.status(200).send('Webhook received successfully.');
    } catch (error) {
        console.error('Error handling webhook event:', error);
        res.status(500).json({ error: 'An error occurred while handling the webhook event' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
