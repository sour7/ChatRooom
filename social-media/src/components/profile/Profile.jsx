import React, { useState, useEffect } from "react";
// import { auth } from '../../config/firebase-config'
// import { logout } from "../../config/firebase-config";
import { Footer } from "../allposts/Footer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

import CreateIcon from "@mui/icons-material/Create";
import "./profile.css";
import { useNavigate } from "react-router";

import Switch from "@mui/material/Switch";
import { db } from "../../config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Profile = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(true);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [updatepic, setUpdatepic] = useState([]);

  //getting data from database
  useEffect(() => {
    getdata();
  }, []);
  var posts = collection(db, "posts");
  async function getdata() {
    var res = await getDocs(posts);
    setUpdatepic(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  console.log(updatepic);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleImageChange = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    const base64 = await convertBase64(file);
    console.log(base64);
    setProfilePic(base64);

    // setSelectedFiles([...selectedFiles,base64])
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const updatedUser = JSON.parse(localStorage.getItem("user"));

  //updating profile pic
  const updateProfile = async () => {
    for (let i = 0; i < updatepic.length; i++) {
      if (updatepic[i].email === updatedUser.email) {
        const path = doc(posts, updatepic[i].id);
        await updateDoc(path, { profilePic: profilePic });
      }
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, profilePic: profilePic })
    );
    alert("profile Updated");
    navigate("/allposts");
  };
  // console.log("chacked", checked);
  return (
    <div>
      <div className="top">
        <div className="left" onClick={() => navigate("/allposts")}>
          <ArrowBackIosIcon />
          <h2>Profile</h2>
        </div>
        <div>
          <LogoutIcon />
        </div>
      </div>
      <div className="picdiv">
        <img className="pic" src={profilePic} alt="" />

        <div>
          <label className="label1">
            <input type="file" id="file" onChange={handleImageChange} />
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
            inputProps={{ "aria-label": "controlled" }}
          />
        </span>
      </div>

      <div className="draft"></div>

      <div>
        <button className="updatepro" onClick={updateProfile}>
          Update Profile
        </button>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;
