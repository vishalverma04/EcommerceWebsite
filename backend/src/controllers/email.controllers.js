import transporter from '../config/email.js';

const sendOtpEmail = async (fullName,email, otp) => {
  const htmlcontent=`
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #1a73e8;
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            background-color: #ffffff;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        .warning {
            background-color: #fff8f8;
            border-left: 4px solid #ff4444;
            padding: 10px;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #666666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Account Verification Code</h2>
        
        <p>Dear ${fullName},</p>
        
        <p>Your One-Time Password (OTP) for account verification is:</p>
        
        <div class="otp-code">${otp}</div>
        
        <strong>This OTP is valid for only 10 minutes</strong>
        
        <div class="warning">
            <strong>Important Security Notes:</strong>
            <ul>
                <li>Do not share this OTP with anyone</li>
                <li>Our team will never ask for your OTP</li>
                <li>If you didn't request this OTP, please ignore this email</li>
            </ul>
        </div>
        
        <p>For security purposes, this OTP can only be used once. If you need a new OTP, you can request it from the sign page.</p>
        
        <p>If you have any issues, please contact our support team.</p>
        
        <p>Best regards,<br>HG ENTERPRISES INDIA</p>
        
        <div class="footer">
            This is an automated message. Please do not reply to this email.
            <br>
            © 2024 HG ENTERPRISES INDIA. All rights reserved.
        </div>
    </div>
</body>
</html>
  
  `
    const mailOptions = {
        // from: process.env.EMAIL_FROM, 
        to: email,
        subject: 'Verify your email',
        html: htmlcontent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error)
        } else {
            
            res.status(201).json({status:201,info})
        }
    })
};

export default sendOtpEmail;