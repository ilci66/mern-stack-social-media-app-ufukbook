import React from 'react';
import Post from './post/post'
import {Container, Col, Row, Form, FormControl, Button} from 'react-bootstrap'

const Posts = () => {
  return(
    <div>
      <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
      </Form>
      <Container>
        <Row>
          <Col xs={{order: "last"}} lg={8} md={6} sm={12}>
            <h2>Posts will be mapped here</h2>
          </Col>
          <Col lg={4} md={6} xs={{order: "first"}} sm={12}><Post /></Col> 
        </Row>
        
      </Container>
      
    </div>
    )
} 

export default Posts