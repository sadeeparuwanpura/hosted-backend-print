const axios = require('axios');
const io = require('socket.io-client');

const printFunction = async (req, res) => {
    // Flag to track if a response has been sent
    let responseSent = false;

    try {
        const socket = io('http://192.168.21.232:4005', {
            timeout: 5000
        });

        // Emit event to get print details and handle the response
        socket.emit('getPrintDetails', {}, (printDetails) => {
            if (!responseSent) {
                responseSent = true;

                // Handle the received print details
                console.log('Received print details:', printDetails);

                // Send the response back to the client
                res.status(200).json(printDetails);

                // Close the socket connection
                socket.disconnect();
            }
        });

        // Handle connection errors
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
            if (!responseSent) {
                responseSent = true;
                res.status(500).json({ error: 'Failed to connect to local app' });
            }
        });

        // Handle connection timeout
        socket.on('connect_timeout', () => {
            console.error('Connection timeout');
            if (!responseSent) {
                responseSent = true;
                res.status(500).json({ error: 'Connection timeout' });
            }
        });
    } catch (error) {
        console.error('Error in printFunction:', error);
        if (!responseSent) {
            responseSent = true;
            res.status(500).json({ error: 'An error occurred' });
        }
    }
};

module.exports = { printFunction };

