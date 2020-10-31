module.exports = {
    addEmail: async (req, res) => {
        const { email } = req.body,
              db = req.app.get('db');

        const checkedEmail = await db.newsletter.check_email(email);

        if (checkedEmail) {
            return res.status(400).send('Email already subscribed')
        }

        db.newsletter.add_email(email).then(_ => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    getEmails: (req, res) => {
        const db = req.app.get('db');

        db.newsletter.get_emails().then(emails => {
            res.status(200).send(emails);
        }).catch(err => console.log(err));
    },
    deleteEmail: (req, res) => {
        const id = +req.params.id,
              db = req.app.get('db');

        db.newsletter.delete_email(id).then(_ => {
            res.sendStatus();
        }).catch(err => console.log(err));
    }
}