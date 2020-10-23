const {STRIPE_SECRET_KEY} = process.env,
    stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = {
    completePayment: async (req, res) => {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://localhost:3000?success=true`,
            cancel_url: `https://localhost:3000?success=false`
        });

        res.send({ id: session.id})
        
    }
}