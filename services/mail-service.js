const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'wedrobetona@yandex.ru',
    pass: 'betonawedro'
  }
});

class MailService { 
  constructor() {}
  
  async sendMessage (toEmail, subject, text, html) {
    if (!toEmail) {
      throw 'Email is empty.';
    }
    
    if (!subject) {
      if (!html) {
        if (!text) {
          throw 'Wrong message.';
        }
      }
    }
    
    let message = {
      from: 'wedrobetona@yandex.ru',
      to: toEmail,
      subject,
      html,
      text
    };

    await transporter.sendMail(message);
  }
}

module.exports = new MailService();