const {STRIPE_SECRET_KEY} = process.env,
    stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = {
    completePayment: async (req, res) => {
        // Getting cart items ready for stripe payment
        const {cart} = req.body;
        const cartItems =cart.map((item) => {
            const { shirt } = item;
            const shirtPrice = shirt.price * 100;
            const taxPrice = shirtPrice * 0.0727;
            const total = Math.ceil(shirtPrice + taxPrice);
            let lineItem = {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: shirt.name,
                        images: [shirt.img_url],
                    },
                    unit_amount: total,
                },
                quantity: item.quantity,
            }
            return lineItem
            
        })

        // Sending session for redirect to stripe for payment
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems,
            mode: 'payment',
            success_url: `http://localhost:3000/#/checkout/success`,
            cancel_url: `http://localhost:3000`,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
        });

        res.send({ id: session.id})
    }
}