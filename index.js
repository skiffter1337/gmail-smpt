const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({origin: '*'}))

let smtp_login = process.env.SMTP_LOGIN || "___"
let smtp_password = process.env.SMTP_PAWSSWORD || "___"



let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});



app.get('/', (req, res) => {
    res.send('Hello Samurai!!!')
})
app.post('/sendMessage', async (req, res) => {

    const {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: "My profile page",
        to: "shulapov1999@gmail.com",
        subject: "Форма на портфолио заполнена",
        text: `Sent from ${email}, Name: ${name}. Message: ${message}`, 
        // html: "<b>Привет</b> <div style='background: hotpink'> Я отправил эту хуйню через nodejs </div>", // html body
    });

    res.send(req.body)
})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})