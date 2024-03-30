import React, { useContext, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";


function CreatePost() {
    const initialValues={
        title:"",
        postText:"",
    }
    const { authState } = useContext(AuthContext);

    useEffect(()=>{
      if (!localStorage.getItem('accessToken')) {
        navigate("/login");
    }},[])

    const navigate=useNavigate();

    const onSubmit=(data)=>{

        axios.post("https://full-stack-server-production-cdf9.up.railway.app/posts",data,{
          headers:{accessToken:localStorage.getItem("accessToken")}
        }).then((resp)=>{
        navigate('/')
      })
    }

    const validationSchema=Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
    })

  return (
    <div className="createPostPage">
      <h1 className='createPostText'>Show the world your new post ...</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

        <Form className="formContainer">
            <label>Title : </label>
            <ErrorMessage name='title' component="span"/>
            <Field id="inputCreatePost" name="title" placeholder="(Ex. Title..)" autoComplete="off"/>

            <label>Post : </label>
            <ErrorMessage name='postText' component="span"/>
            <Field id="inputCreatePost" name="postText" placeholder="(Ex. Post..)" autoComplete="off" />

            <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
