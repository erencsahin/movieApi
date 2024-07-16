const mongoose = require('mongoose');

const dbUri = 'mongodb+srv://erencsahin:15661555@movieapi.lv2uad4.mongodb.net/?retryWrites=true&w=majority&appName=movieApi';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = connectDB;
