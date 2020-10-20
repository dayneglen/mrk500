module.exports = {
    getProducts: async (req, res) => {
        const db = req.app.get('db');
        db.products.get_products().then(products => {
            res.status(200).send(products)
        }).catch(err => console.log(err))
        
    },
    getProduct: (req, res) => {
        const id = +req.params.id,
            db = req.app.get('db');

        db.products.get_product(id).then(product => {
            res.status(200).send(product)
        }).catch(err => console.log(err));
        

    },
    addProduct: async (req, res) => {
        const { name, price, img_url } = req.body,
            db = req.app.get('db');

        const product = await db.products.add_product({name, price, img_url});
        const sizes = await db.products.get_product_sizes();
        sizes.forEach(size => {
            db.products.add_shirt(product[0].product_id, size.product_size_id);

        })
        res.sendStatus(201);
    },
    updateProduct: (req, res) => {
        const id = +req.params.id,
              { name, price, img_url } = req.body,
              db = req.app.get('db');

        db.products.update_product({name, price, img_url, id}).then(product => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    deleteProduct: (req, res) => {
        const id = +req.params.id,
            db = req.app.get('db');

        db.products.delete_product(id).then(() => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    }
}