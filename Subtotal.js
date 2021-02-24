import React from 'react'
import CurrencyFormat from "react-currency-format";
import "./subtotal.css"
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from 'react-router-dom';

function Subtotal() {

    const history = useHistory();
    const [{ basket }, dispatch] = useStateValue(); 

    return (
        <div>
            <div className="subtotal">
                <CurrencyFormat 
                    renderText={(value) => (
                        <>
                        <p id="totall">
                            Total: 
                    <strong id="stronge">{value} USD</strong>
                        </p>
                        <p id="taxship">Tax included and shipping calculated at checkout</p>
                        <button onClick={e => history.push('/payment')} className="checkout__button">Checkout</button>
                        </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                />
            </div>
        </div>
    )
}

export default Subtotal
