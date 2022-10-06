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
  console.log("ps", posts);

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

//  const [heartrxn, setHeartrxn]= useState(null)
// const [count, setCount]= useNavigate(null)

//  const handlerexn=(idx)=>{
//     for(let i=0; i<data.length; i++){
//       if(data[i].id===idx){
//        setCount[i]
//        setHeartrxn(!heartrxn)
//       }
//     }
//  }

  return (
    <div>
      
      <div className="title">
        <p>Tech</p>
        <p>X</p>
      </div>
      <Link to= '/createpost' style={{textDecoration:"none"}}> <div className="whtsinMind">What's on your mind ?</div></Link>
     
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
            {user.name === e.name ? (
              <Popup item={e} />
              
            
            ):
            ""}
          </div>

          <div style={{ width: "80%", margin: "auto", textAlign: "left", marginBottom:"10px" }}>
            {e.postText}
          </div>
          {e.imageData.map((elm) => (
            <img src={elm} alt="" style={{ width: "80%", height: "40vh" }} />
          ))}
          <div className="rxn">
            <div >
              <FavoriteIcon />
            </div>
            <div>
              <InsertEmoticonIcon />
            </div>
            <div>
              <ThumbUpIcon />
            </div>
          </div>
        </div>
      ))}

      <Footer/>
    </div>
  );
};
