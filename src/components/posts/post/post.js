import React, {useState, useEffect} from 'react';

const Post = () => {
  
  return(
    <div>
      <h2>Create or edit your post here</h2>
      <form>
        <div className="mb-0">
          <input type="file" className="form-control"/>
          <label for="pic"></label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingInput" placeholder="Example Title"/>
          <label for="floatingInput">Title</label>
        </div>
        <div className="form-floating">
          <input type="postInfo" className="form-control" id="floatingPostInfo" placeholder="Camping with Ufuk"/>
          <label for="FloatingPostInfo">What's your post about?</label>
        </div>

      </form>
    </div>
    )
} 

export default Post