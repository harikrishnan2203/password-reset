const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    try {
        // Construct the MongoDB connection URI using environment variables
        const DB_URI = `mongodb+srv://${encodeURIComponent(process.env.DB_USERNAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        // Connect to the MongoDB database
        await mongoose.connect(DB_URI);

        // Check if the connection is successful or not
        if (mongoose.connection.readyState === 1) {
            console.log('Database connection successful');
        } else {
            // Log any errors that occur during the connection process
            console.log('Could not establish connection');
        }
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
};

module.exports = {
    connectToDB,
};
