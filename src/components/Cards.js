import React from 'react'
import CardItem from './CardItem'
import './Cards.css';
import { useInView } from 'react-intersection-observer';



   

function Cards() {
  const { ref: myRef, inView: myElementIsVisible } = useInView();
  return (
    
      <div className='cards'>
        <h1 ref={myRef} className={myElementIsVisible ? 'animateMyref' : 'hidden'}>Video Projects</h1>
        <div className="cards__container">
            <div className="cards__wrapper">
                <ul className="cards__items">
                    <CardItem/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards
