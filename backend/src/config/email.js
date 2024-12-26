import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid or SMTP
  auth: {
    user: process.env.EMAIL_AUTH, // Replace with your email
    pass: process.env.EMAIL_PASS,  // Replace with your email password or app-specific password
  },
});

export default transporter;