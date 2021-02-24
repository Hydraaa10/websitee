import React from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Admin from './components/pages/Admin/Dashboard';
import Services from './components/pages/Services/Services';
import Products from './components/pages/Products/Products';
import SignUp from './components/pages/SignUp/SignUp';
import Checkout from './components/pages/Cart/Checkout.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/pages/Footer.js/Footer';
import About from './components/pages/AboutUs/About';
import Contact from './components/pages/Contact/Contact';
import ScrollToTop from './components/ScrollToTop';
import LoginPage  from './components/LoginPage';
import Payment  from './components/Payment';
import { useStateValue } from './components/pages/Cart/StateProvider';
import Orders  from './components/Orders';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  "pk_test_51I4roHDbKBqU3OnKC4BtLB5OPjDbV9Q8fEcp50edgEN944wonKTLtgXP16tk7JlMOCqaHd2znFEVmoJ25kqrDOHC00YrdwXfaC"
  )

function App() {

  const [cartItems, setCartItems] = useState([]); 

  const [{}, dispatch] = useStateValue();

  return (
    <Router>
      <ScrollToTop />
      <Switch>
      <Route path='/orders' exact>
      <Navbar />
        <Orders />
      </Route>
      <Route path='/' exact>
      <Navbar />
        <Home/>
      <Footer />
      </Route>
      <Route path='/productpage' >
      <Navbar />
        <Products/>
      <Footer />
      </Route>
      <Route path='/aboutus'>
      <Navbar />
        <About/>
      <Footer />
      </Route>
      <Route path='/payment'>
        <Elements stripe={promise}>
          <Payment/>
        </Elements>
      </Route>
      <Route path='/contact'>
      <Navbar />
        <Contact/>
      <Footer />
      </Route>
      <Route path='/cart'>
      <Navbar />
        <Checkout/>
      <Footer />
      </Route>
      <Route path='/services'>
      <Navbar />
        <Services/>
      <Footer />
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
