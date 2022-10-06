import React, { useState } from "react";
// import { auth } from '../../config/firebase-config'
import { logout } from "../../config/firebase-config";
import { Footer } from "../allposts/Footer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

import CreateIcon from "@mui/icons-material/Create";
import "./profile.css";
import { useNavigate } from "react-router";

import Switch from '@mui/material/Switch';
import { db } from "../../config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion
 
} from "firebase/firestore";

const Profile = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate= useNavigate()
 

  const [checked, setChecked] = React.useState(true);
  const [profilePic, setProfilePic] = useState(user.profilePic)
  // const [post, setPost] = useState("");
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleImageChange = async(e) => {
    console.log(e.target.files[0])
      const file= e.target.files[0]
   
      const base64= await convertBase64(file)
      console.log(base64)
       setProfilePic(base64)
      
      // setSelectedFiles([...selectedFiles,base64])
    };
  
    const convertBase64 =(file)=>{
      return new Promise((resolve, reject)=>{
        var fileReader= new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload =()=>{
          resolve(fileReader.result)
        }
        fileReader.onerror =(err)=>{
         
            reject(err)
          
        }
      })
    }
    
    localStorage.setItem('user', JSON.stringify({...user,profilePic:profilePic}));
const updatedUser = JSON.parse(localStorage.getItem('user'));
// console.log("updatedUser",updatedUser)

// var posts = collection(db, "posts");

const updateProfile =()=>{
  const data = doc(db, "posts", updatedUser.name);
// await setDoc(data, {
//     name: "sourabh kumar",
//     profilePic: profilePic
// });

// To update age and favorite color:
 updateDoc(data, {
  profilePic: updatedUser.profilePic
 

});
navigate('/allposts')

  
//   console.log(updatedUser)
//   var path=doc(posts, updatedUser.name);
//   const obj11={
//     profilePic: updatedUser.profilePic,
//     time: Date.now(),
//   }
//   console.log("posts", )
// await updateDoc(path, obj11);
//   // navigate('/allposts')
}

  return (
    <div>
      <div className="top">
        <div className="left"  onClick={()=>navigate('/allposts')}>
          <ArrowBackIosIcon />
          <h2>Profile</h2>
        </div>
        <div onClick={logout}>
          <LogoutIcon />
        </div>
      </div>
      <div className="picdiv">
        <img className="pic" src={profilePic} alt="" />
       
<div>
          <label className="label1">
            <input
              type="file"
              id="file"
             onChange={handleImageChange}
             
            />
            <div>
            <CreateIcon />
            
            </div>
          </label>
        </div>
      </div>

      <h2>{user.name}</h2>

      <div className="notification">
        <div>
          <NotificationsIcon style={{ color: "#1976d2 ", fontSize: "32px" }} />
          <p>Notification</p>
        </div>
        <span>
        <Switch
  checked={checked}
  onChange={handleChange}
  inputProps={{ 'aria-label': 'controlled' }}
/>
        </span>
      </div>

      <div>
        <button className="updatepro" onClick={updateProfile}>Update Profile</button>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;
