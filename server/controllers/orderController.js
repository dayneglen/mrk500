module.exports = {
    placeOrder: async (req, res) => {
        const {total} = req.body,
              customerID = +req.params.id,
              db = req.app.get('db');
            
        
        if(!req.session.cart) {
            return res.status(400).send('No items in cart to purchase')
        }

        // Takes customer id as a param and creates new order for customer
        const order = await db.orders.place_order({id: customerID, total});
        let {cart} = req.session;

        // Takes items off from cart, starting at the back, and adds to them to database, connecting order to customerID
        for(let i = cart.length - 1; i >= 0; i--) {
            db.orders.place_item([cart[i].shirt.shirt_id, order[0].order_id, cart[i].quantity]);
            cart.pop();
        }
        res.sendStatus(200);
    },
    getCustomerOrders: (req, res) => {
        const id = +req.params.id,
              db = req.app.get('db');
        
        db.orders.get_customer_orders(id).then(orders => {
            res.status(200).send(orders);
        }).catch(err => console.log(err))
    },
    getOrder: (req, res) => {
        const userId = +req.params.id,
              {orderId} = req.body,
              db = req.app.get('db');

        db.orders.get_order(userId, orderId).then(products => {
            res.status(200).send(products);
        }).catch(err => console.log(err));
    }
}