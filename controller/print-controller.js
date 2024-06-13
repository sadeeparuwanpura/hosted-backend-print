const axios = require('axios');
const io = require('socket.io-client');

const printFunction = async (req, res) => {
    try {
        const socket = io('http://192.168.21.232:7000');

        socket.emit('getPrintDetails', {}, (printDetails) => {
            console.log('Received print details:', printDetails);

            res.status(200).json(printDetails);

            socket.disconnect();
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
            res.status(500).json({ error: err });
        });
    } catch (error) {
        console.error('Error in printFunction:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = { printFunction };
