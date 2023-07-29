import React from 'react';
import './Services.css';
import { useInView } from 'react-intersection-observer';


	

function AboutUs() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  return (
   <>
   <h1 ref={myRef} className={myElementIsVisible ? 'animateMyref' : 'hidden'}>Services</h1>

   <div className="services__wrapper" id='services'>
       <div className="services__item">
       <img src="images/services1.png" alt="About" className="services__icon" />
        <h3 className="title">Events</h3>
        <span className="services__post">1 day event coverage with expert photographer. From Preparation, Ceremony, Reception(Wedding)</span>
        
        </div>
        <div className="services__item">
        <img src="images/services2.png" alt="About" className="services__icon" />
        <h3 className="title">Full Video Coverage</h3>
        <span className="services__post">“Creating a timeless look, coupled with a flawless moment.”</span>
        
        </div>
        <div className="services__item">
        <img src="images/services3.png" alt="About" className="services__icon" />
        <h3 className="title">Photo and Video Editing</h3>
        <span className="services__post">“Artistic clicks to define your beautiful moments.”</span>
       
        </div>
        <div className="services__item">
        <img src="images/services4.png" alt="About" className="services__icon" />
        <h3 className="title">Same Day Editing</h3>
        <span className="services__post">“Make your wedding event memorable with our clicks.”</span>
        
        </div>
        
    </div>
    
   </>
  )
}

export default AboutUs
