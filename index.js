require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

// Send email every minute
cron.schedule('* * * * *', async () => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: 'jha8447632759@gmail.com', 
            subject: 'Daily Greeting',
            text: 'Hi I am Roshan'
        });
        console.log('Email sent successfully:', new Date().toLocaleString());
    } catch (error) {
        console.error('Error:', error);
    }
});

app.get('/', (req, res) => {
    res.send('Scheduler is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});