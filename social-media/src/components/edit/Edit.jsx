import React from "react";
import { useState, useEffect } from "react";

import { db } from "../../config/firebase-config";

import { useRef } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";

import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const Edit = (props) => {
  // console.log("propedut", props)
  const [data, setData] = useState([]);

  var posts = collection(db, "posts");
  // console.log("ps", posts);

  async function getdata() {
    var res = await getDocs(posts);
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  //   console.log("data", data)
  useEffect(() => {
    getdata();
  }, []);

  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [cameraImg, setCameraImg] = useState([])
  const [camera, setCamera] = useState(false);
  const [post, setPost] = useState("");
  var user = JSON.parse(localStorage.getItem("user"));
  // var posts = collection(db, "posts");
  const webRef = useRef();
  const sessionStorageDta = JSON.parse(sessionStorage.getItem("data"));
  // console.log(sessionStorageDta.item.name)
  const updatePost = async () => {
    var path = doc(posts, sessionStorageDta.item.id);
    const object1 = {
      name: user.name,
      profilePic: user.profilePic,
      postText: post || sessionStorageDta.item.postText,
      imageData: selectedFiles,

      time: Date.now(),
    };

    await updateDoc(path, object1);
    alert("post updated");
    navigate("/allposts");
  };

  const handleImageChange = async (e) => {
    // console.log(e.target.files[0])
    const file = e.target.files[0];
    // console.log(file)
    const base64 = await convertBase64(file);
    //   console.log(base64)

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

  // const renderPhotos = (source) => {
  //   // console.log('source: ', source);
  //   return selectedFiles.map((photo) => {
  //     return <img src={photo} alt="" key={photo} />;
  //   });
  // };

  const handleCamera = () => {
    setCamera(!camera);
  };

  const showImg = (e) => {
    // console.log(webRef.current.getScreenshot());
    setSelectedFiles([...selectedFiles, webRef.current.getScreenshot()]);
  };

  const navigate = useNavigate();

  const idx = sessionStorage.getItem("id");
  // console.log("idx", idx)
  const deletephoto = (e) => {
    let x = e.target.getAttribute("removePic");
    setSelectedFiles(selectedFiles.filter((items) => items !== x));
  };

  return (
    <div>
      <div className="header">
        <p>Edit Post</p>

        <p onClick={() => navigate("/allposts")}> X</p>
      </div>
      <hr />
      <div>
        {data.map(
          (el) =>
            el.id === sessionStorageDta.item.id && (
              <div>
                <textarea
                  name=""
                  id="textArea"
                  cols="95"
                  rows="20"
                  placeholder="What's on your mind "
                  defaultValue={el.postText}
                  onChange={(el) => setPost(el.target.value)}
                ></textarea>
                {/* <div className="result">{renderPhotos(selectedFiles)}
         </div> */}
                {selectedFiles.map((ele) => {
                  return (
                    <div className="picArray">
                      <img src={ele} alt="" />
                      <span removePic={ele} onClick={deletephoto}>
                        X
                      </span>
                    </div>
                  );
                })}
                {/* <img src={el.imageData} alt=""  /> */}
              </div>
            )
        )}

        {/* {
          selectedFiles.map(ele => {
            return (
              <div><img src={ele} alt="" /></div>
            )
          })
        }  */}
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
      <button className="postbtn" onClick={() => updatePost(idx, data)}>
        Update Post
      </button>
    </div>
  );
};
