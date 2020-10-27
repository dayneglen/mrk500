import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import routes from './routes';
import './styles/reset.css';
import './styles/scss/style.css';

function App() {
  return (
    <div>
      <Header />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
