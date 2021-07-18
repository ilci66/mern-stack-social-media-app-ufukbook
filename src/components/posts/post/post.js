import React, { useState, useEffect } from 'react';
import { Convert } from 'mongo-image-converter';
import axios from 'axios';

const Post = ({userInfo}) => {
  const [title, setTitle] = useState("");
  const [postInfo, setPostInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage ] = useState(undefined);
  
  // console.log(userInfo)

  const handleSubmit = async (e) => {
    try {
      const convertedImage = await Convert(image)
      if(convertedImage){
        console.log("converted Image <<<<",convertedImage)
        console.log("image <<<<", image)
        const data = await {
          image: convertedImage,
          creator: userInfo.username,
          postInfo: postInfo,
          title: title,
        }

        axios.post('http://localhost:5000/post/create', data, {withCredentials: true})
        .then(res => {
          setErrorMessage("")
          console.log("post created")
          // console.log(res.data)
          setImage(undefined)
          setTitle("")
          setPostInfo("")
          Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
          })
        .catch(error => {
          console.log("got an error from server")
          console.log("catching", error.response.data.error)
          setErrorMessage(error.response.data.error)
        })
      }
      else{console.log("The file is not in format of image/jpeg or image/png")}
    } catch (error) {
      console.log(error.message)
      setErrorMessage("The file is not in format of image/jpeg or image/png")
    }
  }
  return(
    <div>
      <h2>Create posts here</h2>
        <div className="mb-0">
          <input 
            type="file" 
            className="form-control" 
            id="imageture" 
            accept="image/jpeg, image/png" 
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label for="imageture"></label>
        </div>
        <div className="form-floating mb-3">
          <input 
            maxLength="30"
            required
            type="text" 
            className="form-control" 
            onChange={(e) =>setTitle(e.target.value)} 
            id="floatingTitle" 
            placeholder="Example Title"
          />
          <label for="floatingInput">Post Title </label>
        </div>
        <div className="form-floating mb-3">
          <input
            maxLength="200"
            required
            type="text" 
            className="form-control" 
            onChange={(e) => setPostInfo(e.target.value)} 
            id="floatingPostInfo" 
            placeholder="Camping with Ufuk"/>
          <label for="FloatingPostInfo">What's your post about? </label>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary mb-5">Submit</button>
        
          {errorMessage !== "" && <div class="alert alert-danger" role="alert">{errorMessage}</div>}
        
    </div>
    )
} 

export default Post