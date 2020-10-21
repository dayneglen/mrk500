const {STRIPE_SECRET_KEY} = process.env,
    stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = {
    completePayment: (req, res) => {
        
    }
}