const nodemailer = require('nodemailer');
require('dotenv').config();
const { Resend } = require('resend');


const resend = new Resend(process.env.RESEND_API_KEY);
const SendEmail = async (Data) => {
  console.log('---------------------------------------->\n',Data);
  
  try {
    const { data, error } = await resend.emails.send({
      from : 'Ultriti <noreply@ultriticart.in>',
      to:Data.to,
      subject : Data.subject,
      html : Data.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    console.log('Email sent:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: err };
  }
};




const sendRegistraionCodeEmail = async (email, emailCode, name_) => {

  const mailOptions = {
    from: 'ultrititech@gmail.com',
    to: email,
    subject: 'Action Required: Confirm Your Email Verification Code',
    text: `Hello ${name_},\nYour verification code is: ${emailCode}\nThis code will expire in 10 minutes.\nIf you didn’t request this, please ignore this email.\n\nThanks,\nThe Ultriti Team`,
    html: `<p><strong>${name_}</strong><br/>(${email})</p>

       <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>🔐 Registration Email Verification </h2><h2 style="color: "black"; font-weight = 600; ">Communichat</h2>
      <p>Hello,</p>
      <p>Your Communicat App verification code is:</p>
      <h1 style="color: #007bff;">${emailCode}</h1>
      <p>This code will expire in 10 minutes. If you didn’t request this, please ignore this email.</p>
      <br>
      <p>Thanks,<br>The Ultriti Team</p>
    </div>
    `
  };

  try {
    const info = await SendEmail(mailOptions);

    const information = {
      info: info,
      Success: false,
      code: emailCode
    }

    if (info) {
      information.Success = true
    }

    console.log(`✅ Welcome email sent to ${email}: ${information}`);
    return information
    
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error);
  }

}
module.exports = {  SendEmail,sendRegistraionCodeEmail };
