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
              { size, tall } = req.body,
              db = req.app.get('db');

        if (!req.session.cart) {
            req.session.cart = [];
        }
        let { cart } = req.session;
        const product = await db.products.get_product(id);
        const shirtSize = await db.products.get_shirt_size([size, tall]);
        const shirt = await db.products.get_shirt([product[0].product_id, shirtSize[0].product_size_id])
        let foundProduct = cart.findIndex(currentShirt =>  currentShirt.shirt.shirt_id === shirt[0].shirt_id);
        if (foundProduct === -1) {
            cart.push({ shirt: shirt[0], quantity})
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
            if (item.shirt.shirt_id === id) {
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