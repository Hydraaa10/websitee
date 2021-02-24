import React, { useState, useEffect } from 'react';
import './payment.css';
import BillingDetailsFields from "./BillingDetailsFields";
import { useStateValue } from './pages/Cart/StateProvider';
import CheckoutProduct from './pages/Cart/CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './pages/Cart/reducer';
import { db } from "../firebase"; 
import axios from './axios';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const[clientSecret, setClientSecret] =useState("");

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const billingDetails = {
            name: event.target.name.value,
            email: event.target.email.value,
            address: {
              city: event.target.city.value,
              line1: event.target.address.value,
              state: event.target.state.value,
              postal_code: event.target.zip.value
            }
          };

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: billingDetails
            }


        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
            .collection('users')
            .doc(billingDetails.name)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                name: billingDetails.name,
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                address: billingDetails.address
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            

            history.replace('/orders')
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
          base: {
            iconColor: 'white',
            color: 'white',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
          },
          invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
          },
        },
      };

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                color={item.color}
                                size={item.size}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                <BillingDetailsFields />
                                    <CardElement options={CARD_OPTIONS} onChange={handleChange}/>
                                </fieldset>
                                

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment













































// // // import React, { useEffect, useState } from 'react'
// // // import { useStateValue } from './pages/Cart/StateProvider';
// // // import CheckoutProduct from './pages/Cart/checkoutprod';
// // // import './payment.css';
// // // import { useHistory } from "react-router-dom";
// // // import { useElements, CardElement, useStripe } from '@stripe/react-stripe-js';
// // // import { event } from 'jquery';
// // // import CurrencyFormat from 'react-currency-format';
// // // import { getBasketTotal } from './pages/Cart/reducer';
// // // import axios from './axios';

// // // function Payment() {

// // //     const [{ basket },dispatch] = useStateValue();
// // //     const history = useHistory();

// // //     const stripe = useStripe();
// // //     const elements = useElements();
// // //     const [succeeded, setSucceeded] = useState(false);
// // //     const [processing, setProcessing] = useState("");
// // //     const [error, setError] = useState(null);
// // //     const [disabled, setDisabled] = useState(true);
// // //     const [clientSecret, setClientSecret] = useState(true);

// // //     useEffect(() => {
// // //             //generate the shit secret kettle
// // //             const getClientSecret = async () => {
// // //                 const response = await axios({
// // //                     method: 'post',
// // //                     url: `/payments/create?total=${getBasketTotal(basket) * 100}`
// // //                 });
// // //                 setClientSecret(response.data.clientSecret)
// // //             }

// // //             getClientSecret();
// // //     }, [basket])

    

// // //     const handleSubmit = async (event) => {
// // //         //fancy stripe shit
// // //         event.preventDefault();
// // //         setProcessing(true);
        
// // //          const payload = await stripe.confirmCardPayment(clientSecret, {
// // //              payment_method: {
// // //                  card: elements.getElement(CardElement)
// // //              }
// // //          }).then(({ paymentIntent }) => {

            

// // //              setSucceeded(true);
// // //              setError(null);
// // //              setProcessing(false);

// // //              history.replace('/orders');
// // //          })



        
// // //     }

    

// // //     const handleChange = event => {
// // //         setDisabled(event.empty);
// // //         setError(event.error ? event.error.message : "fuck you have a shitty error");
// // //     }

// // //     console.log(clientSecret);

// // //     return (
// // //         <div className="payment">
// // //             <div className="payment_container">
// // //                 <img id="payment-logo" src="images/logo-white.png" alt=""/>
// // //                 <div className="carde">
// // //                     <form>
// // //                     <CardElement onChange={handleChange}/>

// // //                     <div className="payment__priceContainer">
// // //                         <CurrencyFormat id="currency"
// // //                         renderText={(value) => (
// // //                             <>
// // //                             <h3>Order Total: {value}</h3>
// // //                             </>
// // //                         )}
// // //                         decimalScale={2}
// // //                         value={getBasketTotal(basket)}
// // //                         displayType={"text"}
// // //                         thousandSeperator={true}
// // //                         prefix={"$"}
// // //                         />
// // //                         <button disabled={processing || disabled || succeeded}>
// // //                             <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
// // //                         </button>
// // //                     </div>
// // //                     {error && <div>{error}</div>}
// // //                 </form>
// // //                 </div>
                 
// // //             </div>

// // //             <div className="products-container">
// // //                 {basket.map(item => (
// // //                     <CheckoutProduct id="product-11"
// // //                     id={item.id}
// // //                     title={item.title}
// // //                     image={item.image}
// // //                     size={item.size}
// // //                     color={item.color}
// // //                     price={item.price}
// // //                     />
// // //                 ))}

               
                
// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default Payment





// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from './axios';
// import React, { useEffect, useState } from 'react'
// import CurrencyFormat from 'react-currency-format';
// import { Link, useHistory } from 'react-router-dom';
// import CheckoutProduct from './pages/Cart/CheckoutProduct';
// import './payment.css'
// import { getBasketTotal } from './pages/Cart/reducer';
// import { useStateValue } from './pages/Cart/StateProvider';
// import { db } from '../firebase';

// function Payment() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const history = useHistory();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [succeeded, setSucceeded] = useState(false);
//     const [processing, setProcessing] = useState("");
//     const [error, setError] = useState(null);
//     const [disabled, setDisabled] = useState(true);
//     const [clientSecret, setClientSecret] = useState(true);

//     const ebencalisartikoc = basket[1];

//     useEffect(() => {
//         // generate the special stripe secret which allows us to charge a customer

//         const getClientSecret = async () => {
//             const response = await axios({
//                 method: 'post',
//                 // stripe expects the total in a currencie's subunits
//                 url: `/payments/create?total=${getBasketTotal(basket) * 100}`
//             });
//             setClientSecret(response.data.clientSecret)
//         };

//         getClientSecret();
//     }, [basket])

//     console.log('the secret is >>>', clientSecret)
//     console.log('sichqon', user)
//     console.log(basket)

//         const b = basket;
//     const handleSubmit = async (event) => {
//         // stripe stuff goes here 
//         event.preventDefault();
//         setProcessing(true);

//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement)
//             }
//         }).then(({ paymentIntent }) => {
//             // paymentIntent = payment confirmation
           
//             const prie = getBasketTotal(basket) + "$"; 

//             db
//                 .collection('users')
//                 .doc(user?.uid)
//                 .collection('orders')
//                 .doc(paymentIntent.id)
//                 .set({
//                     Urunler: basket,
//                     Fiyat: prie,
//                     Zaman: paymentIntent.created
//                 })
//                 console.log(b);

//             setSucceeded(true);
//             setError(null);
//             setProcessing(false);

           

//             history.replace('/orders')
//         })
//     }

//     const handleChange = event => {
//         // listen for the changes in the CardElement and display any errors as the user types their card details
//         setDisabled(event.empty);
//         setError(event.error ? event.error.message : '')
//     }
//     return (
//         <div className="payment">
//             <div className="payment__container">

//                 <h1>
//                     Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
//                 </h1>

//                 {/* payment section - delivery address */}
//                 <div className="payment__section">
//                     <div className="payment__title">
//                         <h3>Delivery Address</h3>
//                     </div>
//                     <div className="payment__address">
                    
//                         <p>Sample Address</p>
//                         <p>No city, No state</p>
//                     </div>
//                 </div>
//                 {/* payment section - review items */}
//                 <div className="payment__section">
//                     <div className="payment__title">
//                         <h3>Review Items and Delivery</h3>
//                     </div>
//                     <div className="payment__items">
//                         {/* products go here */}
//                         {basket.map(item => (
//                             <CheckoutProduct
//                                 id={item.id}
//                                 title={item.title}
//                                 price={item.price}
//                                 image={item.image}
//                                 color={item.color}
//                                 size={item.size}
//                             />
//                         ))}
//                     </div>
//                 </div>
//                 {/* payment section - payment method */}
//                 <div className="payment__section">
//                     <div className="payment__title">
//                         <h3>Payment Methods</h3>
//                     </div>
//                     <div className="payment__details">
//                         {/* stripe goes in here */}

//                         <form onSubmit={handleSubmit}>
//                             <CardElement onChange={handleChange} />
//                             <div className="payment__priceContainer">
//                                 <CurrencyFormat
//                                     renderText={(value) => (
//                                         <h3>Subtotal: {value}</h3>
//                                     )}
//                                     decimalScale={2}
//                                     value={getBasketTotal(basket)}
//                                     displayType={'text'}
//                                     thousandSeparator={true}
//                                     prefix={'$'}
//                                 />
//                                 <button disabled={processing || disabled || succeeded}>
//                                     <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
//                                 </button>
//                             </div>
//                             {/* error  */}
//                             {error && <div>{error}</div>}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Payment


// // import React, { useState, useEffect } from 'react';
// // import './payment.css';
// // import { useStateValue } from './pages/Cart/StateProvider';
// // import CheckoutProduct from './pages/Cart/CheckoutProduct';
// // import { getBasketTotal } from './pages/Cart/reducer';
// // import axios from './axios';
// // import { db } from '../firebase';
// // import { firebaseApp } from "../firebase";
// // import { Link, useHistory } from "react-router-dom";
// // import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// // import CurrencyFormat from "react-currency-format";

// // function Payment() {
// //     const [{ basket, user }, dispatch] = useStateValue();
// //     const history = useHistory();

// //     const stripe = useStripe();
// //     const elements = useElements();

// //     const [succeeded, setSucceeded] = useState(false);
// //     const [processing, setProcessing] = useState("");
// //     const [error, setError] = useState(null);
// //     const [disabled, setDisabled] = useState(true);
// //     const [clientSecret, setClientSecret] = useState(true);

// //     useEffect(() => {
// //         // generate the special stripe secret which allows us to charge a customer
// //         const getClientSecret = async () => {
// //             const response = await axios({
// //                 method: 'post',
// //                 // Stripe expects the total in a currencies subunits
// //                 url: `/payments/create?total=${getBasketTotal(basket) * 100}`
// //             });
// //             setClientSecret(response.data.clientSecret)
// //         }

// //         getClientSecret();
// //     }, [basket])

// //     console.log('THE SECRET IS >>>', clientSecret)

// //     const handleSubmit = async (event) => {
// //         // do all the fancy stripe stuff...
// //         event.preventDefault();
// //         setProcessing(true);

// //         const payload = await stripe.confirmCardPayment(clientSecret, {
// //             payment_method: {
// //                 card: elements.getElement(CardElement)
// //             }
// //         }).then(({ paymentIntent }) => {
// //             // paymentIntent = payment confirmation
// //             console.log(basket);
// //             console.log(paymentIntent.amount);
// //             console.log(paymentIntent.created);

// //             db
// //                 .collection('users')
// //                 .doc(user?.uid)
// //                 .collection('orders')
// //                 .doc(paymentIntent.id)
// //                 .set({
// //                     basket: basket,
// //                     amount: paymentIntent.amount,
// //                     created: paymentIntent.created
// //                 })

// //             setSucceeded(true);
// //             setError(null)
// //             setProcessing(false)

// //             dispatch({
// //                 type: 'EMPTY_BASKET'
// //             })

// //             history.replace('/orders')
// //         })

// //     }

// //     const handleChange = event => {
// //         // Listen for changes in the CardElement
// //         // and display any errors as the customer types their card details
// //         setDisabled(event.empty);
// //         setError(event.error ? event.error.message : "");
// //     }

   
// //     console.log(db);

// //     return (
// //         <div className='payment'>
// //             <div className='payment__container'>
// //                 <h1>
// //                     Checkout (
// //                         <Link to="/checkout">{basket?.length} items</Link>
// //                         )
// //                 </h1>


// //                 {/* Payment section - delivery address */}
// //                 <div className='payment__section'>
// //                     <div className='payment__title'>
// //                         <h3>Delivery Address</h3>
// //                     </div>
// //                     <div className='payment__address'>
                        
// //                         <p>123 React Lane</p>
// //                         <p>Los Angeles, CA</p>
// //                     </div>
// //                 </div>

// //                 {/* Payment section - Review Items */}
// //                 <div className='payment__section'>
// //                     <div className='payment__title'>
// //                         <h3>Review items and delivery</h3>
// //                     </div>
// //                     <div className='payment__items'>
// //                         {basket.map(item => (
// //                             <CheckoutProduct
// //                                 id={item.id}
// //                                 title={item.title}
// //                                 image={item.image}
// //                                 price={item.price}
// //                                 rating={item.rating}
// //                                 color={item.color}
// //                                 size={item.size}
// //                             />
// //                         ))}
// //                     </div>
// //                 </div>
            

// //                 {/* Payment section - Payment method */}
// //                 <div className='payment__section'>
// //                     <div className="payment__title">
// //                         <h3>Payment Method</h3>
// //                     </div>
// //                     <div className="payment__details">
// //                             {/* Stripe magic will go */}

// //                             <form onSubmit={handleSubmit}>
// //                                 <CardElement onChange={handleChange}/>

// //                                 <div className='payment__priceContainer'>
// //                                     <CurrencyFormat
// //                                         renderText={(value) => (
// //                                             <h3>Order Total: {value}</h3>
// //                                         )}
// //                                         decimalScale={2}
// //                                         value={getBasketTotal(basket)}
// //                                         displayType={"text"}
// //                                         thousandSeparator={true}
// //                                         prefix={"$"}
// //                                     />
// //                                     <button disabled={processing || disabled || succeeded}>
// //                                         <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
// //                                     </button>
// //                                 </div>

// //                                   {/* Errors */}
// //                                 {error && <div>{error}</div>}
// //                             </form>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Payment