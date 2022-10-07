import React, { useEffect, useState } from "react";
import "./allposts.css";
import { db } from "../../config/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { Footer } from "./Footer";

export const Allposts = () => {
  const [data, setData] = useState([]);

  var posts = collection(db, "posts");
  // console.log("ps", posts);

  async function getdata() {
    var res = await getDocs(posts);
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  // console.log("id",data.map((e)=>e.id))

  useEffect(() => {
    getdata();
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));

  //  const navigate= useNavigate()

  // const [rxn, setRxn] =useState(false)
  const [heart, setHeart] = useState(false);
  const [simle, setSmile] = useState(false);
  const [like, setLike] = useState(false);
  const [idx, setIdx] = useState("")
  var arr=[];
  data.map((e)=>(
    arr.push(e.id)
    ))
    var arr1=[]
 const handleFavoriteIcon=(id)=>{
        
  for(let i=0; i<arr.length; i++){
    if(arr[i]===id){
    
      setHeart(true)
          setSmile(false)
          setLike(false)
          setIdx(id)
    }
  }
        
 }
 const insertEmoticonIcon=(id)=>{
  setHeart(false)
  setSmile(true)
  setLike(false)
 }
 const thumbUpIcon=(id)=>{

  setHeart(false)
    setSmile(false)
    setLike(true)
 }

  return (
    <div>
      <div className="title">
        <p>Tech</p>
        <p>X</p>
      </div>
      <Link to="/createpost" style={{ textDecoration: "none" }}>
        {" "}
        <div className="whtsinMind">What's on your mind ?</div>
      </Link>

      {data.map((e) => (
        <div className="card" key={e.id}>
          <div className="profile">
            <div>
              <img
                src={e.profilePic}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <h3> {e.name} </h3>
            </div>
            {user.name === e.name ? <Popup item={e} /> : ""}
          </div>

          <div
            style={{
              width: "80%",
              margin: "auto",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            {e.postText}
          </div>
          {e.imageData.map((elm) => (
            <img src={elm} alt="" style={{ width: "80%", height: "40vh" }} />
          ))}
          <div className="rxn">
            <div onClick={() => handleFavoriteIcon(e.id)}>
              {
                // console.log("ads", e.id)
               
                arr1.map(i=> i===idx) && heart?
                <FavoriteIcon  style={{color:"#1976d2"}}/>:
                <FavoriteIcon />
              }
            </div>
            <div onClick={() => insertEmoticonIcon(e.id)}>
              {
                simle?
                <InsertEmoticonIcon  style={{color:"#1976d2"}} />:
                <InsertEmoticonIcon />
              }
            </div>
            <div  onClick={() => thumbUpIcon(e.id)} >
              {
               
                like?
                <ThumbUpIcon style={{color:"#1976d2"}} />:
                <ThumbUpIcon />
              }
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};
