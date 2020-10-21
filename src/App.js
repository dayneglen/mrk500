import React from 'react';
import Header from './Components/Header';
import routes from './routes';
import './styles/reset.css';
import './styles/scss/style.css';

function App() {
  return (
    <div>
      <Header />
      {routes}
    </div>
  );
}

export default App;
