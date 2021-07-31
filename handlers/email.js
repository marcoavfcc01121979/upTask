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
const gerarHTML = (arquivo, opcoes = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${arquivo}.pug`, opcoes);
    return juice(html);
}
exports.enviar = async (opcoes) => {
    const html = gerarHTML(opcoes.arquivo, opcoes);
    const text = htmlToText.fromString(html);
    
    let mailOptions = {
        from: "Uptask <no-reply@uptask.com>",
        to: opcoes.usuario.email,
        subject: opcoes.subject,
        text,
        html, 
    }
    const enviarEmail = util.promisify(transport.sendMail, transport)
    return enviarEmail.call(transport, mailOptions)
}
