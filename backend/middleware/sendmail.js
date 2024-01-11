const sendMail=async(email)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.HOST_NODEMAILER,
        port: process.env.PORT_NODEMAILER,
        secure: true,
        auth: {
          user: process.env.FORM_EMAIL_NODEMAILER,
          pass: process.env.FORM_PASS_NODEMAILER,
        },
    });

    // Sending the mail to users:
    const mailOptions = {
        from : process.env.FORM_EMAIL_NODEMAILER,
        to : email,
        subject : 'Your OTP for registration',
        text : `Yout OTP is ${otp}`
    };
    const sendingMail = await transporter.sendMail(mailOptions);
}

module.exports=sendMail