import React, {  useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { db } from "../../config/firebase-config";
import { addDoc, collection, updateDoc } from "firebase/firestore";

import "./createpost.css";
import { useNavigate } from "react-router";


export const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [cameraImg, setCameraImg] = useState([])
  const [camera, setCamera] = useState(false);
  const [post, setPost] = useState("");
  const [heart, setHeart] =useState([])
  const [smile, setSmile] =useState([])
  var user = JSON.parse(localStorage.getItem("user"));
  var posts = collection(db, "posts");
  const webRef = useRef();
  const navigate = useNavigate();
   
  useEffect(()=>{
    setSelectedFiles(draft&&draft.imageData)
  },[])


  const createPost = async () => {
    
    const obj = {
      name: user.name,
      profilePic: user.profilePic,
      uid: user.uid,
      email:user.email,
      postText: post||draft.postText,
      tags : post.match(/#\w+/g),
      imageData: selectedFiles,
      heart :heart,
      smile:smile,
      //  cameraImg:cameraImg,
     

      time: Date.now(),
    }
    
    await addDoc(posts, obj);
    
    alert("data posted");
    navigate("/allposts");
    
    localStorage.setItem(
    "draftPosts",
      JSON.stringify({ ...draft, postText: "" ,imageData:""})
    );
  };
  

  const handleImageChange = async (e) => {
    // console.log(e.target.files[0])
    const file = e.target.files[0];

    const base64 = await convertBase64(file);
    // console.log(base64);

    setSelectedFiles([...selectedFiles, base64]);
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



  const deletephoto = (e) => {
    let x = e.target.getAttribute("removePic");
    setSelectedFiles(selectedFiles.filter((items) => items !== x));
  };

  const handleCamera = () => {
    setCamera(!camera);
  };

  const showImg = (e) => {
    // console.log(webRef.current.getScreenshot());
    setSelectedFiles([...selectedFiles, webRef.current.getScreenshot()]);
  };

  
  // save as Draft
  const saveAsDraft=()=>{
 if (window.confirm("do you want to save it")){
  
    const darftPost=
     { name: user.name,
      profilePic: user.profilePic,
      uid: user.uid,
      email:user.email,
      postText: post||draft.postText,
      tags : post.match(/#\w+/g),
      imageData: selectedFiles,
      heart :heart,
      smile:smile,
      time: Date.now(),}
       
        
           localStorage.setItem("draftPosts",JSON.stringify(darftPost));  
           navigate("/allposts")
        
        }
    }
    
    var draft = JSON.parse(localStorage.getItem("draftPosts"));
  // console.log("fraft", draft.postText)

  


  return (
    <div className="cont">
      <div className="header">
        <p>Create Post</p>

        <p onClick={saveAsDraft}> X</p>
      </div>
      <hr />
      <div>
        {
          (draft?.postText)?
          <textarea
            name=""
            id="textArea"
            cols="95"
            rows="20"
            placeholder="What's on your mind "
            defaultValue={draft.postText}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>:
          <textarea
          name=""
          id="textArea"
          cols="95"
          rows="20"
          placeholder="What's on your mind "
          defaultValue={post}
          onChange={(e) => setPost(e.target.value)}
        ></textarea>
        }

        {selectedFiles&&
        selectedFiles.map((ele) => {
          return (
            <div className="picArray" key={ele}>
              <img src={ele} alt="" />
              <span removePic={ele} onClick={deletephoto}>
                X
              </span>
            </div>
          );
        })}
        {camera && (
          <div className="cameradiv">
            <Webcam ref={webRef} />
            <button
              className="clickbtn"
              onClick={() => {
                showImg();
              }}
            >
              SNAP
            </button>
          </div>
        )}
      </div>
      <div className="uploadmedia">
        <div>
          <label className="label">
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <div>
              <PhotoSizeSelectActualIcon />
              <p>Photo/Video</p>
            </div>
          </label>
        </div>

        <div className="camera" onClick={handleCamera}>
          <CameraAltIcon />
          <p>Camera</p>
        </div>
      </div>
      <button className="postbtn" onClick={createPost}>
        POST
      </button>
    </div>
  );
};
