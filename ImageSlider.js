import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import "./imageslider.css";
import { Component } from "react";

export default class AsNavFor extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  state = {
    slideIndex: 0,
    updateCount: 0
  };wsdwsw





  render() {
    return (
      <div className="sliderrr">
       <div className="big-slider">
       <Slider 
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          arrows={false}
          fade={true}
          responsive={[
            {
              breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
          },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
          ]}
        >
          <div>
            <img id="yetek" src={"images/black.jpg"} alt=""/>
          </div>
          <div>
          <img id="yetek" src={"images/brown.jpg"} alt=""/>
          </div>
          <div>
          <img id="yetek" src={"images/white.jpg"} alt=""/>
          </div>
          <div>
          <img id="yetek" src={"images/gren.jpg"} alt=""/>
          </div>
        </Slider>
       </div>
       <div className="bruhente">
       <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          arrows={true}
          vertical={true}
      verticalSwiping={true}
          focusOnSelect={true}
          arrows={false}
          responsive={[
            {
              breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: true,
            slidesToScroll: 2,
            }
          },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: true,
                aroows: true
              }
            },
          ]}
        >
           <div className="secondboa">
            <img id="bluck" src={"images/black.jpg"} alt=""/>
          </div>
          <div className="secondboa">
          <img id="brow"  src={"images/brown.jpg"} alt=""/>
          </div>
          <div className="secondboa">
          <img id="white" src={"images/white.jpg"} alt=""/>
          </div>
          <div className="secondboa">
            <img id="gron" src={"images/gren.jpg"} alt=""/>
          </div>
        </Slider>
       </div>


       <div className="mobile-slider">
       <div>
        <Slider 
        dots={true}
        infinite= {true}
        speed= {500}
        slidesToShow= {1}
        slidesToScroll={1}
        centerMode={true}
      
        >
          <div className="secondboa">
            <img id="mobile-black" src={"images/black.jpg"} alt=""/>
          </div>
          <div className="secondboa">
          <img id="mobile-brown"  src={"images/brown.jpg"} alt=""/>
          </div>
          <div className="secondboa">
          <img id="mobile-white" src={"images/white.jpg"} alt=""/>
          </div>
          <div className="secondboa">
            <img id="mobile-green" src={"images/gren.jpg"} alt=""/>
          </div>
        </Slider>
      </div>
       </div>

       <div className="selector">
       </div>
      </div>
    );
  }
}