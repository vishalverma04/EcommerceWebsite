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

// Function to send OTP email

const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM, 
        to: email,
        subject: 'Verify your email',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error)
        } else {
            console.log("Email sent:" + info.response);
            res.status(201).json({status:201,info})
        }
    })
};

export default sendOtpEmail;