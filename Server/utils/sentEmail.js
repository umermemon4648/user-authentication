const {createTransport} = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const sendEmail = async(to, subject, text)=>{
    const transporter = createTransport({
        host: process.env.SMTP_Host,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD
        }
    })
    await transporter.sendMail({
        to,
        subject,
        text,

    })

}

module.exports = sendEmail