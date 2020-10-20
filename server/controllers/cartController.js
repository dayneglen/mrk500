let cartID = 1;

module.exports = {
    getCart: (req, res) => {
        if (!req.session.cart) {
            req.session.cart = []
        }

        res.status(200).send(req.session.cart);
    },
    addItem: async (req, res) => {
        const id = +req.params.id,
              quantity = +req.body.quantity,
              db = req.app.get('db');

        if (!req.session.cart) {
            req.session.cart = [];
        }
        let { cart } = req.session;
        const product = await db.products.get_product(id);
        let foundProduct = cart.findIndex(item =>  item.product.product_id === id);
        if (foundProduct === -1) {
            cart.push({ product: product[0], quantity, cartID })
            cartID++;
        } else {
            cart[foundProduct].quantity += quantity;
        }

        return res.status(200).send(cart);
    },
    updateQuantity: (req, res) => {
        const id = +req.params.id,
            quantity = +req.body.quantity,
            { cart } = req.session;

        cart.forEach((item, i, arr) => {
            if (item.cartID === id) {
                arr[i].quantity += quantity;
            }
        });
        res.status(200).send(cart);
    },
    removeItem: (req, res) => {
        const id = +req.params.id,
              { cart } = req.session;
        let foundIndex = cart.findIndex(item => item.product.product_id === id);
        cart.splice(foundIndex, 1);
        res.status(200).send(cart);
    }
}