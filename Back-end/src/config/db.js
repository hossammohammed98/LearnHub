const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODB) {
        throw new Error('Missing MONGODB environment variable');
    }

    await mongoose.connect(process.env.MONGODB, {
        serverSelectionTimeoutMS: 5000,
    });
};

module.exports = { connectDB };
