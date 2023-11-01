const nodemailer = require('nodemailer')
/*const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "ymaraproveedorsmtp@gmail.com",
      pass: "ymara12345",
    },
  }); */
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
     // user: process.env.MAIL_USERNAME,
     // pass: process.env.MAIL_PASSWORD,
     // clientId: process.env.OAUTH_CLIENTID,
     // clientSecret: process.env.OAUTH_CLIENT_SECRET,
     // refreshToken: process.env.OAUTH_REFRESH_TOKEN
     user: "ymaraproveedorsmtp@gmail.com",
     pass: "ymara12345",
      clientId: "679791519442-9ocnio300cj696e0i6vv05790psg4413.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "1//04f0-Uloxmoc8CgYIARAAGAQSNwF-L9IrrfTbbqyXuTXVrcyqA6Bih7iPcU7nTnxfZfcp_DWhCxtVPAWKzQmYCNc-JT7uYXgN-0M"
    }
  }); 


  module.exports = transporter;




