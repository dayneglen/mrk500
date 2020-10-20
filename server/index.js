require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env,
      authCtrl = require('./controllers/authController'),
      productCtrl = require('./controllers/productController'),
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
app.post('/auth/login', authCtrl.login);
app.post('/auth/register', authCtrl.register);
app.get('/auth/logout', authCtrl.logout);

// Cart endpoints

// Product endpoints
app.get('/api/products', productCtrl.getProducts);
app.get('/api/product/:id', productCtrl.getProduct);
app.post('/api/product', productCtrl.addProduct);
app.put('/api/product/:id', productCtrl.updateProduct);
app.delete('/api/product/:id', productCtrl.deleteProduct);


app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));