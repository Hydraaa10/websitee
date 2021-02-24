
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { useStateValue } from "./pages/Cart/StateProvider";
import { Link } from 'react-router-dom';
import './Navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function Navbar() {
  const [{ basket }, dispatch] = useStateValue(); 
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      <div className="discounter">
             Get Free shipping and 20% discount
           </div>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img src="images/logo-white.png" alt=""/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
               <li className='nav-item'>
                 <Link to='/' className='nav-links nav-1' onClick={closeMobileMenu}>
                   Home
                 </Link>
               </li>
               <li className='nav-item'>
                 <Link to='/contact' className='nav-links nav-1' onClick={closeMobileMenu}>
                   Contact
                 </Link>
               </li>
               <li className='nav-item'>
                 <Link to='/aboutus' className='nav-links nav-1' onClick={closeMobileMenu}>
                   About Us
                 </Link>
               </li>
               <li className='nav-item nav-1'>
                 <a href="https://parcelsapp.com/en" target="blank_" className='nav-links' onClick={closeMobileMenu}>
                   Track Your Order
                 </a>
               </li>
               <li className='nav-item'>
                 <Link to='/productpage' className='nav-links nav-1' onClick={closeMobileMenu}>
                    Shop LiesML Sneaker
                   </Link>
                 </li>
               </ul>
          </div>
          <div className="cartto">
    <span className="headeroptline basketcount">{basket?.length}</span>
              <Link to="/cart">
           <FaShoppingCart className="shopping_cart"/>
          </Link>
         </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
// import { IconContext } from 'react-icons/lib';

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [button, setButton] = useState(true);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const showButton = () => {
//     if (window.innerWidth <= 960) {
//       setButton(false);
//     } else {
//       setButton(true);
//     }
//   };

   


//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//       <div className="discounter">
//             Get Free shipping and 20% discount
//           </div>
//         <nav className='navbar'>
//         <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//               LIESML
//             </Link>
//           <div className='navbar-container container'>
            
//             <div className='menu-icon' onClick={handleClick}>
//               {click ? <FaTimes /> : <FaBars />}
//             </div>
//             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//               <li className='nav-item'>
//                 <Link to='/' className='nav-links nav-1' onClick={closeMobileMenu}>
//                   Home
//                 </Link>
//               </li>
//               <li className='nav-item'>
//                 <Link to='/contact' className='nav-links nav-1' onClick={closeMobileMenu}>
//                   Contact
//                 </Link>
//               </li>
//               <li className='nav-item'>
//                 <Link to='/aboutus' className='nav-links nav-1' onClick={closeMobileMenu}>
//                   About Us
//                 </Link>
//               </li>
//               <li className='nav-item nav-1'>
//                 <Link
//                   to='/services'
//                   className='nav-links'
//                   onClick={closeMobileMenu}
//                 >
//                   Services
//                 </Link>
//               </li>
//               <li className='nav-item'>
//                 <Link
//                   to='/productpage'
//                   className='nav-links nav-1'
//                   onClick={closeMobileMenu}  
//                 >
//                   Product Page
//                 </Link>
//               </li>
//             </ul>
//           </div>
//          
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default Navbar;
