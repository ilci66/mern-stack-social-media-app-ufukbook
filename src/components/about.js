import React, {useEffect, useState} from 'react';
import {Carousel, Item, Caption} from 'react-bootstrap'
import axios from 'axios';

const About = () => {
  const [userInfo, setUserInfo] = useState(undefined)

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth",
    }).then((res) => {
      console.log(res.data);
      if(res.data) setUserInfo(res.data)
      else if(!res.data){
        window.location="/login"
      }
    }).catch(error => {
      console.log(error)
      window.location="/login"
    })
  },[])
  
  return(
    <div>
    {userInfo ? <Carousel className="mb-5 p-1">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.imgur.com/5Z8nDvl.jpg?1"
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
          src="https://i.imgur.com/kFLOjny.jpg?2"
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
          src="https://i.imgur.com/gLFiC4o.jpg?2"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Adventurous.</h3>
          <p>Loves exploring, full of curiosity!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> 
     : "Loading..."}
    
      
      {userInfo ? <div className="w-50 mx-auto"><h3>So who actually is Ufuk the Impressive</h3> 
      <p>According to legends Ufuk was not born into this world, he was 
      travelling the universe as a form of 
      energy when he came across our planet. 
      After seeing the potential in mankind he 
      decided to reshape himself into a human form 
      and bless us with his existance.<br/>
        Even though he is believed to be over 200 years old, he looks like
         he's in his 30s. Ufuk the Impressive runs for 45 kms each day after 

         swimming 20 kms and when he is done he starts with his actual workout.<br/>He has written over 240 books in 47 different categories and he translated each book to 17 different languages.  
    <br/>And these are only some of his many achievements.</p></div>: null}
    
    </div>
    
    )
} 

export default About