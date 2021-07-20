import React, {useEffect, useState} from 'react';
import Post from './post/post'
import axios from 'axios'
import {Container, Col, Row, Form, FormControl, Button, Card, Img, Body, Title, Text, Footer, Badge} from 'react-bootstrap'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Posts = ({userInfo}) => {

  const [allPosts, setAllPosts] = useState(undefined)
  const [likeCount, setLikeCount] = useState(undefined)
  const [searchBy, setSearchBy] = useState("")
  const [liked, setLiked] = useState(undefined)

  useEffect(() => {
      axios.get('http://localhost:5000/posts')
      .then(res => {
        console.log(typeof res.data)
        setAllPosts(res.data.slice(0).reverse())
      })
      .catch(error => {
        console.log(error)
      })
    // }
    
  }, [])
  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearchBy(e.target.value)

  }

  const handleDelete = (e) => {
    if(!userInfo) window.location = '/login'
    else if(userInfo.username == "ufuk"){
      console.log("here")
      const data = {creator: userInfo.username, title:e.target.id}
      console.log(data)
      axios.delete('http://localhost:5000/delete', {data})
        .then(res => {
          console.log(res)
          window.location.reload(false)
        }).catch(error => {
          console.log(error)
        })
    }else if(userInfo.username !== e.target.value){
      return alert("You can only delete your own posts!")
    }else{
      const data = {creator: userInfo.username, title:e.target.id}
      console.log(data)
      axios.delete('http://localhost:5000/delete', {data})
        .then(res => {
          console.log(res)
          window.location.reload(false)
        }).catch(error => {
          console.log(error)
        })
    }
  } 
  return(
    <div>
      <Form inline>
      <FormControl type="text"  placeholder="Search" onChange={handleSearch} className="mb-3 text-center w-30"/>
      </Form>
      {userInfo ?       <Container>
        <Row>
          <Col lg={3} md={4} sm={12}><Post userInfo={userInfo}/></Col> 
          <Col lg={9} md={8} sm={12} className="">
          <Row xs={1} md={2} className="g-4">
            {allPosts && searchBy === "" ? allPosts.map(post => {
              return<Col className="flex"> <Card className="p-3 mx-auto" >
                <Card.Img variant="top" src={post.image} />
                <Card.Body >
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.postInfo}
                  </Card.Text>
                  
                  <Button value={post.creator} id={post.title} variant="danger" className="mb-2" onClick={handleDelete}>Delete Post</Button>
                <Card.Footer>
                  Created by <b>{post.creator}</b>, <b><ReactTimeAgo date={post.createdAt} locale="en-US"/></b>
                </Card.Footer>
                </Card.Body>
              </Card></Col>
              
              }): allPosts && searchBy !== "" ? allPosts.filter(post => post.title.search(new RegExp(searchBy, "i")) >= 0).map(post => {
              return<Col className="flex"> <Card className="p-3 mx-auto" >
                <Card.Img variant="top" src={post.image} />
                <Card.Body >
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.postInfo}
                  </Card.Text>
                
                  <Button value={post.creator} id={post.title} variant="danger" className="mb-2" onClick={handleDelete}>Delete Post</Button>
                <Card.Footer>
                  Created by <b>{post.creator}</b>, <b><ReactTimeAgo date={post.createdAt} locale="en-US"/></b>
                </Card.Footer>
                </Card.Body>
              </Card></Col>
  
              }) :<p style={{fontSize:"15px"}}>Loading posts...</p>}
          </Row>
          </Col>
        </Row>
        
      </Container> : "Loading..."}

      
    </div>
    )
} 

export default Posts