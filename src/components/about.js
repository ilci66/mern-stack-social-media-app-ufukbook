import React from 'react';
import {Carousel, Item, Caption} from 'react-bootstrap'

const About = () => {
  return(
    <div>
    <Carousel className="mb-5 p-1">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/5Z8nDvl.jpg"
          alt="First slide"
        />
        <Carousel.Caption variation="dark">
          <h3>Great with Animals</h3>
          <p>With his cat J.Lo that he rescued from a burning building.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/kFLOjny.jpg?1"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Work hard, play hard!</h3>
          <p>His colleagues are delighted to work with him, chosen employee of the year 4 years in row.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/gLFiC4o.jpg?1"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Adventurous.</h3>
          <p>Loves exploring, full of curiosity!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <h1>Who's Ufuk The Ipressive?</h1>
      <p>lorem ipsumAliquip nulla magna minim magna. 
      Deserunt quis do ullamco pariatur commodo
       laborum magna ullamco velit ad et minim 
       consequat. Aliquip culpa irure voluptate
        Lorem laboris do ea nostrud pariatur deserunt 
        ad. Voluptate veniam est cupidatat nulla ipsum 
        qui incididunt proident cupidatat cupidatat est 
        aliqua velit proident.</p>
    </div>
    
    )
} 

export default About