import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

function ProfilePage() {
  let {id}=useParams();
  const [username,setUsername]=useState('')
  const [listOfPosts,setListOfPosts]=useState([])
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(()=>{
    axios.get(`https://full-stack-server-production-cdf9.up.railway.app/auth/info/${id}`).then((res)=>{
      setUsername(res.data.username);
    })


    axios.get(`https://full-stack-server-production-cdf9.up.railway.app/posts/byUserId/${id}`).then((res)=>{
      setListOfPosts(res.data);
    })
  },[])

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1>Username:{username} </h1>
        {
          authState.username===username && <button onClick={()=>{navigate('/changepassword')}}>Change Password</button>
          
        }

      </div>
      <div className='listOfPosts'>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username"> {value.username}</div>
              <div className="buttons">
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
      </div>
  )
}

export default ProfilePage
