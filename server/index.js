require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      path = require('path'),
      { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env,
      authCtrl = require('./controllers/authController'),
      productCtrl = require('./controllers/productController'),
      cartCtrl = require('./controllers/cartController'),
      orderCtrl = require('./controllers/orderController'),
      stripeCtrl = require('./controllers/stripeController'),
      emailCtrl = require('./controllers/nodemailerController'),
      newsletterCtrl = require('./controllers/newsletterController'),
      app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxage: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

// Auth endpoints
app.get('/auth/logout', authCtrl.logout);
app.get('/auth/user', authCtrl.getUser);
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);

// Product endpoints
app.get('/api/products', productCtrl.getProducts);
app.get('/api/product/:id', productCtrl.getProduct);
app.post('/api/product', productCtrl.addProduct);
app.put('/api/product/:id', productCtrl.updateProduct);
app.put('/api/product/remove/:id', productCtrl.removeProduct);
app.put('/api/product/add/:id', productCtrl.returnProduct);

// Cart endpoints
app.get('/api/cart', cartCtrl.getCart);
app.post('/api/cart/:id', cartCtrl.addItem);
app.put('/api/cart/:id', cartCtrl.updateQuantity);
app.delete('/api/cart/:id', cartCtrl.removeItem);

// Order endpoints
app.get('/api/orders/:id', orderCtrl.getCustomerOrders);
app.post('/api/order/:id', orderCtrl.placeOrder);
app.post('/api/customer/order/:id', orderCtrl.getOrder);

//Newsletter email endpoints
app.get('/api/newsletter/emails', newsletterCtrl.getEmails);
app.post('/api/newsletter/email', newsletterCtrl.addEmail);
app.delete('/api/newsletter/email/:id', newsletterCtrl.deleteEmail);

// Stripe Endpoint
app.post('/api/payment', stripeCtrl.completePayment);

// Nodemailer Endpoint
app.post('/api/email', emailCtrl.sendContact);
app.post('/api/newsletter/welcome', emailCtrl.sendNewsletterWelcome);

app.use(express.static(__dirname + '/../build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));