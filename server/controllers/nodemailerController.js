const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env;

module.exports = {

    sendContact: async(req, res) => {
        const { email, name, message } = req.body;
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: `MRK500 <${EMAIL}>`,
                to: 'shopmrk500@gmail.com',
                subject: 'Contact Us Message',
                text: 'message',
                html: `<p>You have a question from ${name} at ${email}</p>
                      <p>${message}</p>`
            }, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            });
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err)
        }
    },
    sendNewsletterWelcome: async (req, res) => {
        const { email } = req.body;
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: `MRK500 <${EMAIL}>`,
                to: email,
                subject: 'Welcome to MRK 500!',
                text: 'message',
                html: `<p>Welcome to MRK500!!</p>
                       <p>Thanks for subscribing to our newsletter. As a thank you, here is a promo code for 20% off your next best look!</p>
                       <p>Promo Code: awesomenewlook</p>`
            }, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            });
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err)
    }
  }
}