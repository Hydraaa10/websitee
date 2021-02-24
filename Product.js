import React from "react";
import { useStateValue } from "./StateProvider";
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify';
import "./product.css"

function Product({ title, image, price, discount, heseteasdaa, productprice, titleclass, color, size}) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {

    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        title: title,
        image: image,
        price: price,
        color: color,
        size: size
      },
    });
  };

 


  const notify = () => {
    toast.dark('product added to cart', { 
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      
    })
  }

  return (
   
      <div className="product">
        <ToastContainer limit={1}/>
     <div className="product-information">
     <div className="prod_yeet">
     <p className={titleclass}>{title}</p>
      <p className="product__discount">{discount}</p>
      <img src="{image}" alt="" />
     </div>
     <div className="asdw">
     <p className={productprice}>
        <small>$</small>
        <strong id="priceeee">{price}</strong>
      </p>
     </div>
      <div className="prod_info">
      <button id="product_buynow_btn_home" className="ase">
        BUY IT NOW
      </button>
      <button onClick={() => { addToBasket(); notify()}} className={heseteasdaa}>
        ADD TO CART
      </button>
     </div>
     <div id="toast">

     </div>
      </div>
     
      
    
   </div>
  );
}

export default Product;
