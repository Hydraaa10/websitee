import React, { useEffect } from "react";
import "./checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import ReactGa from "react-ga";
 import { useStateValue } from "./StateProvider.js";
 

function Checkout() {

  const [{ basket }] = useStateValue();

  window.scrollTo(0, 0)

  useEffect(() => {
    ReactGa.initialize('G-MBEX07VV11')

    ReactGa.pageview('/cart')
  }, [])
 

  return (
    <div className="Checkout">
      <div className="checkout_left">
        <div id="checkout__wrapper">
      {basket?.length === 0 ? (
        <div>
          <h1 id="empty">Your Cart is currently empty.</h1>

        </div>
      ) : (
        <div>
          <div className="full-hearder">
          <h2 id="full">Your Cart</h2>
         <div className="infoss">
         <hr id="yeeboi"/>
          <p id="product-text">Product</p>
          <p id="total-text">Total</p>
         </div>
         <hr id="yeeboi"/>
          </div>
          {basket.map((item) => (
              <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                size={item.size}
                color={item.color}
              />
          ))}
          <div className="checkout__right">
      <Subtotal />
    </div>
        </div>
        
      )}
      
    </div>
    </div>

    
    </div>
    
  );
}

export default Checkout;
