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
          <Col lg={3} md={4}  sm={12}><Post /></Col> 
          <Col lg={9} md={8} sm={12}>
            <h2>Posts will be mapped here</h2>
          </Col>
        </Row>
        
      </Container>
      
    </div>
    )
} 

export default Posts