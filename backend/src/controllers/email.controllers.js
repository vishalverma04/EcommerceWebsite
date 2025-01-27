import transporter from '../config/email.js';

const sendOtpEmail = async (email,htmlcontent) => {
  
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