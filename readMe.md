**The proxy server acts as an intermediary between client applications and the DataDog API to avoid CORS Errors.**

**Setup**
1. Clone this repository to your local machine.
2. Install dependencies using npm install.
3. Create a .env file in the root directory and DataDog API key and application key.

**Endpoints**
1. **GET /api/proxy:** Used for forwarding GET requests to the DataDog API. It retrieves data from the DataDog API and sends it back to the client.
2. **POST /api/proxy:** Used for forwarding POST requests to the DataDog API. It allows clients to send data to the DataDog API, such as creating or updating monitors.
3. **POST /webhook:** Endpoint to handle incoming webhook events from DataDog. This endpoint can be used to process webhook events triggered by monitoring activities in DataDog.
