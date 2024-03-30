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
    <div className="registration">
      <h1 className="login">Sign Up</h1>
      <p className="loginSubtext">... to see the whole world on your finger tips!</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            type="password"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default ProfilePage
