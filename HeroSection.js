import React, { Children } from 'react';
import './HeroSection.css';
import $ from 'jquery'
import { Button } from './Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Product from "./pages/Cart/Product";
import Accordion from './Accodion/Accordion';

toast.configure()


function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  producte,
  butto,
  faq,
  backgroun,
  bacc,
  rotatin,
  homepageslider,
  container,
  productdes
}) {
  
  

  const [sizes] = useState([
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "13",
    "14"
  ])
  const [chosenSize, setChosenSize] = useState(sizes[0])


  const [shoes] = useState([
    {
      image2: "images/browne.png",
    },
    {
      image2: "images/blacke.png",
    },
    {
      image2: "images/grene.png",
    },
    {
      image2: "images/whitee.png",
    },
  ]);
  const [shoeImg, setShoeImage] = useState(shoes[3].image2);
  
  const [cars] = useState([
    {
      title2: "Sahara Brown",
      image: "images/brown.jpg",
    },
    {
      title2: "Carbon Black",
      image: "images/black.jpg",
    },
    {
      title2: "SPL Green",
      image: "images/gren.jpg",
    },

    {
      title2: "Ghost White",
      image: "images/white.jpg",
    },
  ]);
  
 
    const [carImage, setCarImage] = React.useState(cars[0].image);
    const [carTitle, setCarTitle] = React.useState(cars[0].title2);
  
    const handleChange = ({ target }) => {
      const index = target.options.selectedIndex;
      const { title2, image } = cars[index];
  
      setCarImage(image);
      setCarTitle(title2);
    };
  
    var selector = '.box button';

    $(selector).on('click', function(){
        $(selector).removeClass('active2');
        $(this).addClass('active2');
    });

  return (

    

    <>
      <div id="eaw"
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
         <div className={container ? 'container' : 'noconte'}>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
               <div className={butto ? 'buttonoff' : 'buttonon'}>
               <Link to="/productpage">
                  <Button buttonSize='btn--wide' id="buttontest" buttonColor='green'>
                    {buttonLabel}
                  </Button>
                </Link>
               </div>

              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
              <div className={homepageslider ? 'homepage-slider' : 'nohome'}>
            <div className="somewhat">
        <img 
        id="homep"
        src={shoeImg} setShoeImage={setShoeImage} />
      </div>

      
      <div className="main-img">
          </div>
          <div className="thumb-img3">
          {shoes.map((shoe, i) => (
               <div className="box active" key={i} onClick={() => {setShoeImage(shoe.image2);}}>
                <img id="thumb-image2" src={shoe.image2} alt="thumb" />
               </div>
            ))}
          </div>
          
            </div>
                <img src={img} alt={alt} className={rotatin ? 'home__hero-img' : 'home__hero-img2'} />
              </div>
              <div className={backgroun ? 'ye' : 'no'}>
              <img src={bacc} alt={alt} className='home__hero-bacc' />

              </div>
            </div>
           
          </div>
                 
        </div>




       <div className={producte ? 'visible' : 'hidden'}>
                  <div id="gotodiv" className="product_component">
                    <Product 
                    title="LiesML Sneaker" 
                    image={carImage}
                    price={59.99}
                    titleclass="product_title_home"
                    productprice="product_price_home"
                    size={chosenSize}
                    heseteasdaa="product_addtocart_btn_home"
                    color={carTitle}
                    />
                  <img className="img-fluid" id="cars" src={carImage}/>


              
                        <div className="thumb-img">
                        {cars.map((car, i) => (
                            <div className="box active" key={i} onClick={() => {setCarImage(car.image); setCarTitle(car.title2)}}>
                              <img id="thumb-image" src={car.image} alt="thumb" />
                            </div>
                          ))}
                        </div>

                        <div className="variation_selector">

                          <h1>LiesML Sneaker</h1>
                          <p>$59</p>

                        <div className="thumb-img2">
                          <label id="itsalabel2">Choose Size:</label>
                        {sizes.map((size, i) => (
                            <div className="box active" key={i} onClick={() => {setChosenSize(size);}}>
                              <button id="varitaion-size-selector"><p id="sizeer">{size}</p></button>
                            </div>
                          ))}
                        </div>
                  
                        <div className="choose-variation">
                                
                        <label id="itsalabel">Choose an Color:</label>

                      
                            <select className="bruh-select" onChange={handleChange} value={carImage} id="variation-select">
                                {cars.map(({ title2, image }) => (
                                <option key={image} value={image}>
                                  {title2}
                                </option>
                                ))}
                            </select>
                        </div>

                        </div>




                  </div>
                 
                 

      
     
       </div>

       <div className={productdes ? 'yee' : 'nuu'}>
         <h1 id="f-h1">FEATURES</h1>
         <div className="features-section">
             <div className="gridder">
               <img id="f-main-image" src="https://ae01.alicdn.com/kf/H400ab20b5ebe4bffa6d8fd03aa7989f0F.jpg" alt=""/>
           <div className="topleft-sect">
             <img id="f-tli" src="images/arch.png" alt=""/>
             <p id="f-tlp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa. Quae inventore error atque,
                adipisci eos dicta reprehenderit corporis saepe in id fuga perspiciatis, consectetur cum, doloribus soluta consequuntur optio?</p>
           </div>
           <div className="topright-sect">
           <img id="f-tri" src="images/arch.png" alt=""/>
             <p id="f-trp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa. Quae inventore error atque,
                adipisci eos dicta reprehenderit corporis saepe in id fuga perspiciatis, consectetur cum, doloribus soluta consequuntur optio?</p>
           </div>
           <div className="bottom-left-sect">
           <img id="f-bli" src="images/arch.png" alt=""/>
             <p id="f-blp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa. Quae inventore error atque,
                adipisci eos dicta reprehenderit corporis saepe in id fuga perspiciatis, consectetur cum, doloribus soluta consequuntur optio?</p>
           </div>
           <div className="bottom-right-sect">
           <img id="f-bri" src="images/arch.png" alt=""/>
             <p id="f-brp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, ipsa. Quae inventore error atque,
                adipisci eos dicta reprehenderit corporis saepe in id fuga perspiciatis, consectetur cum, doloribus soluta consequuntur optio?</p>
           </div>
             </div>
         </div>
       </div>

       <div className={faq ? 'visible' : 'hidden'}>
                  <Accordion />
       </div>
      </div>
    </>
  );
}

export default HeroSection;





{/* <div className="product">
                
                <div className="main-img">
                            <img
                              src={chosenColor}
                              className="pro-img"
                              alt="product"
                            />
                          </div>
                          <div className="thumb-img">
                            {colors.map((color, i) => (
                              <div className="box active" key={i} onClick={() => setChosenColor(color)}>
                                <img src={color} alt="thumb" />
                                
                              </div>
                            ))}
                          
                          
                          </div>
  
                          <div className="size">
                          <div className="thumb-img hetesd">
                            {sizes.map((sizese, i) => (
                              <div className="box active" key={i} onClick={() => setChosenSize(sizese)}>
                                <p id="sizessea">{sizese}</p>                              
                              </div>
                            ))}
                          
                          
                          </div>
                          </div>
  
                            <div className="color">
                            <div className="thumb-img btke">
                            {colorp.map((colore, i) => (
                              <div className="box active" key={i} onClick={() => setChosenColorp(colore)}>
                                <p id="sizessea">{colore}</p>                              
                              </div>
                            ))}
                          
                          
                          </div>
                              </div>                                
                          
                        </div> */}



                        
