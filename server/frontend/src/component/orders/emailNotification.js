const nodemailer = require("nodemailer");

export var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'simplecommercedoge@gmail.com',
        pass: 'simplecom01doge'
    }
})

export var mailOptions = {
    from: 'simplecommercedoge@gmail.com',
    to: 'isabellayang@outlook.com',
    subject: 'Something you want has been stocked',
    text: "Banana is ready to be purchased! Don't miss out! "
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent' + info.response);
    }
})