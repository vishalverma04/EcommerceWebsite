export const DB_NAME="Ecommerce"

export const OtpEmailMessage=(fullName,otp)=>{

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
            © ${new Date().getFullYear()}  HG ENTERPRISES INDIA. All rights reserved.
        </div>
    </div>
</body>
</html>
  
  `
    return htmlcontent
}

export const forgetPasswordEmailMessage=(fullName,resetPasswordLink)=>{
 const htmlcontent=`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .reset-button {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 10px 20px;
            font-size: 16px;
            color:#fff; 
            background-color: #2d89ef;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .reset-link {
            color: #0078d7;
            word-break: break-word;
        }
        .warning {
            margin-top: 20px;
            padding: 10px;
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            border-radius: 5px;
        }
        .warning ul {
            margin: 10px 0 0 20px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            color: #aaa;
            font-size: 12px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>

        <p>Dear ${fullName},</p>

        <p>We received a request to reset your account password. You can reset your password by clicking the button below:</p>

        <a href="${resetPasswordLink}" target='_blank' class="reset-button" style="color: white;">Reset Password</a>

        <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>

        <p class="reset-link">${resetPasswordLink}</p>

        <strong style="color: #e74c3c;">This link is valid for only 15 minutes</strong>

        <div class="warning">
            <strong style="color: #856404;">Important Security Notes:</strong>
            <ul>
                <li>Do not share this link with anyone</li>
                <li>Our team will never ask for your password or reset link</li>
                <li>If you didn't request this password reset, please ignore this email</li>
            </ul>
        </div>

        <p>If you have any issues, please contact our support team.</p>

        <p>Best regards,<br><strong>HG ENTERPRISES INDIA</strong></p>

        <div class="footer">
            This is an automated message. Please do not reply to this email.
            <br>
            © ${new Date().getFullYear()} HG ENTERPRISES INDIA. All rights reserved.
        </div>
    </div>
</body>
</html>

 `
return htmlcontent
}
