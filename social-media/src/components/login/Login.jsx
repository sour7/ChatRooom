import React, { useState } from 'react'
// import {signInWithGoogle ,signInWithfb} from "../../config/firebase-config"

import Button from '@mui/material/Button';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import './login.css'
import { Heading } from '../../page/Heading';

import { getFirestore } from "@firebase/firestore";
import {
 
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,

} from "firebase/auth";
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router';

export const Login = () => {

const navigate= useNavigate()

  const googleprovider = new GoogleAuthProvider();

 const signInWithGoogle = () => {
  signInWithPopup(auth, googleprovider)
    .then((res) => {
      console.log(res);
      const name = res.user.displayName;
      const email = res.user.email;
      const profilePic = res.user.photoURL;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          email: email,
          profilePic: profilePic,
        })
      );
      navigate('/allposts')
    })
    
    .catch((err) => {
      console.log(err);
    });

};

const fbprovider = new FacebookAuthProvider();
 const signInWithfb = () => {
  signInWithPopup(auth, fbprovider)
    .then((res) => {
      console.log(res);
      const name = res.user.displayName;
      const email = res.user.email;
      const profilePic = res.user.photoURL;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          email: email,
          profilePic: profilePic,
        })
      );
      navigate('/allposts')
    })
    .catch((err) => {
      console.log(err);
    });
};

 
  return (
    <div className='login'>
        <Heading/>
         <Button variant='contained'  onClick={signInWithGoogle} startIcon= {<GoogleIcon />}>
        
            LOGIN WITH GOOGLE
            </Button>
            <Button variant='contained'  onClick={signInWithfb} startIcon= {<FacebookIcon />}>
        
        LOGIN WITH FACEBOOK
        </Button>
  
    </div>
  )
}


