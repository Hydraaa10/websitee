import React from 'react'
import './checkoutproduct.css';
import { useStateValue } from "./StateProvider"

function CheckoutProduct({ id, title, image, price, size, color}) {

    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt=""/>

            <div className="checkoutProduct__info">
            <p className="checkoutProduct__price">
                     <small>$</small>
                        <strong>{price} USD</strong>
                 </p>
                 <p className="checkoutProduct__title">{title}</p>
                 <p className="checkoutProduct__size">{size} / {color}  </p>
                 <p className="checkoutProduct__price2">
                     <small>$</small>
                        <strong>{price} USD</strong>
                 </p>

                 <button onClick={removeFromBasket}>Remove from Cart</button>
            </div>
            
        </div>
    )
}

export default CheckoutProduct
