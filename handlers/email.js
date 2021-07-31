const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
})

// gerar HTML
const gerarHTML = () => {
    const html = pug.renderFile(`${__dirname}/../views/emails/restabelecer-password.pug`);
    return juice(html);
}

let mailOptions = {
    from: "Uptask <no-reply@uptask.com>",
    to: '1@1.com',
    subject: "Password Reset",
    text: "Ola",
    html: gerarHTML()
}

transport.sendMail(mailOptions);