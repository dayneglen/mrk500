const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env;

module.exports = {

    sendContact: async(req, res) => {
        const {email, name, message} = req.body;
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
                from: `Mrk500 <${EMAIL}>`,
                to: 'dayneglen@gmail.com',
                subject: 'Contact Us Message',
                text: 'message',
                html: `<p>You have a question from ${name} at ${email}</p>
                      <p>${message}</p>`
            }, (err, res) => {
                if(err) {
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            })
        } catch(err) {
            res.status(500).send(err)
        }
    }
}