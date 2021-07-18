import React, {useEffect, useState} from 'react';
import Post from './post/post'
import axios from 'axios'
import {Container, Col, Row, Form, FormControl, Button, Card, Img, Body, Title, Text} from 'react-bootstrap'

const Posts = ({userInfo}) => {
  const [allPosts, setAllPosts] = useState(undefined)
  const testArray = ["1","2","3","4","5"]

  // useEffect(() => {
  //   axios.get('http://localhost:5000/posts')
  //     .then(res => {
  //       console.log(typeof res.data)

  //       setAllPosts(res.data)
  //       console.log(allPosts)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }, [])
  if(allPosts !== undefined) allPosts.map(post => console.log(post))
  // console.log(allPosts["0"]["title"])
  if(allPosts) {
    allPosts.forEach(post => console.log(post.title))
  }
  // console.log(userInfo)
  return(
    <div>
      <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
      </Form>
      <Container>
        <Row>
          <Col lg={3} md={4} sm={12}><Post userInfo={userInfo}/></Col> 
          <Col lg={9} md={8} sm={12}>
            {/* <h1>{testArray[0]}</h1>
            {testArray.map(num => <h1>{num}</h1>)} */}
            {/* {allPosts !== undefined && <h1>{allPosts.title}</h1>} */}
              
              {/* {allPosts && allPosts.forEach(post => <h1>{post.title}</h1>)} */}
            
          </Col>
        </Row>
        
      </Container>
      
    </div>
    )
} 

export default Posts