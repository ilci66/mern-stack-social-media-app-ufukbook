import React, {useEffect, useState} from 'react';
import Post from './post/post'
import axios from 'axios'
import {Container, Col, Row, Form, FormControl, Button} from 'react-bootstrap'

const Posts = ({userInfo}) => {
  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])
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
            <h2>Posts will be mapped here</h2>
          </Col>
        </Row>
        
      </Container>
      
    </div>
    )
} 

export default Posts