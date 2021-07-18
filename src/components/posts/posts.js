import React, {useEffect, useState} from 'react';
import Post from './post/post'
import axios from 'axios'
import {Container, Col, Row, Form, FormControl, Button, Card, Img, Body, Title, Text, Footer, Badge} from 'react-bootstrap'

const Posts = ({userInfo}) => {
  const [allPosts, setAllPosts] = useState(undefined)
  const [likeCount, setLikeCount] = useState(undefined)
  const [likedUsers, setLikedUsers] = useState(undefined)
  const [liked, setLiked] = useState(undefined)
  // console.log(userInfo.username)
  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        console.log(typeof res.data)
        setAllPosts(res.data)
        // console.log(allPosts.length)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  
  const handleLike = (e) => {
    console.log(typeof e.target.id, typeof e.target.value)
    console.log("this is likes", typeof e.target.value)
    console.log("this is the id", )
    
    const data = { 
      username: userInfo.username,
      id: e.target.id
    }
    axios.post('http://localhost:5000/post/like', data, {withCredentials: true})
      .then(res => {
        console.log(res.data.message)
        if(res.data.message === "disliked") {}
        if(res.data.message === "liked") {}
      })
      .catch(error => {
        console.log(error)
      })

  }
//aldıgın datayı gerekli olanları en azında state butonu ve badgi oyle degistir button stateleri de degistirsin mix
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
          <Row xs={1} md={2} className="g-4">
            {allPosts ? allPosts.map(post => {
              return <Card className="p-3 mx-auto" >
                <Card.Img variant="top" src={post.image} />
                <Card.Body >
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.postInfo}
                  </Card.Text>
                  <Button onClick={handleLike} value={post.likes} id={post._id} variant="success">
                    
                    {post.likes.indexOf(userInfo.username) >= 0 ? "Dislike" : "Like"}
                    <Badge variant="secondary" value={post.likes.length}>{post.likes.length}</Badge>
                  </Button>
                  
                <Card.Footer>
                  Ceated By: {post.creator}
                </Card.Footer>
                </Card.Body>
              </Card>
              {/* <img src={post.image}></img> */}
              }): <p style={{fontSize:"15px"}}>Loading posts...</p>}
          </Row>
          </Col>
        </Row>
        
      </Container>
      
    </div>
    )
} 

export default Posts