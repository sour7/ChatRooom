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
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { Footer } from "./Footer";

// import { useEffect } from "react";
import { messaging } from "../../config/firebase-config";
import { getToken } from "firebase/messaging";

import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";

export const Allposts = () => {
  const [data, setData] = useState([]);

  var posts = collection(db, "posts");
  // console.log("ps", posts);

  async function getdata() {
    var res = await getDocs(posts);
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  // console.log("id",data.map((e)=>e))

  useEffect(() => {
    getdata();

    // getnotification();
  }, []);

  var user = JSON.parse(localStorage.getItem("user"));

  const updatedUser = JSON.parse(localStorage.getItem("user"));

  data.sort(function (x, y) {
    return y.time - x.time;
  });

  var notify = collection(db, "notification");
  // const q = query(notify, orderBy("time"));
  const handleFavoriteIcon = async (receiverId) => {
    const objNotification = {
      receiverId: receiverId,
      senderId: user.uid,
      senderName: user.name,
      text: "reacted on your post",
      time: Date.now(),
    };
    await addDoc(notify, objNotification);
  };

  // <-------moved this to app.js to prevent notification on every page call---------->
  // async function getnotification() {
  //   onSnapshot(q, (snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       setNotificationData(doc.data());
  //     });
  //   });
  // }

  // useEffect(() => {
  //   if (notificationData.receiverId === user.uid) {
  //     showNotification();
  //   }
  // });

  // console.log("notify", notificationData);

  // // notificationData.sort((a, b) => b.time - a.time)
  // function showNotification() {
  //   if (notificationData.receiverId === user.uid) {
  //     addNotification({
  //       title: "TechX",
  //       message: notificationData.senderName + " " + notificationData.text,
  //       native: true,
  //     });
  //   }
  // }

  // <-------------notification for firebase--------------------------------------------------->
  // async function requestPermission() {
  //   const permission = await Notification.requestPermission();
  //   if (permission === "granted") {
  //     // Generate Token
  //     const token = await getToken(messaging, {
  //       vapidKey:
  //         "BIBI6z8JTLwZPnUIzl3kbVBUYynDaWgt6zGdkYA-FkjT9KyjMRhmQPdUaSmH7WBZpQRa32Ab94PCdeVBoj8ps4E",
  //     });
  //     console.log("Token Gen", token);
  //     // Send this token  to server ( db)
  //   } else if (permission === "denied") {
  //     alert("You denied for the notification");
  //   }
  // }

  // useEffect(() => {
  //   // Req user for notification permission
  //   requestPermission();
  // }, []);

  return (
    <div>
      <div className="title">
        <p>Tech</p>
        <p>X</p>
      </div>
      <Link to="/createpost" style={{ textDecoration: "none" }}>
        <div className="whtsinMind">What's on your mind ?</div>
      </Link>

      {data.map((e) => (
        <div className="card" key={e.id}>
          <div className="profile">
            <div>
              <img
                referrerpolicy="no-referrer"
                src={e.profilePic}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <h3> {e.name} </h3>
            </div>
            {user.name === e.name ? <Popup item={e} /> : ""}
          </div>
          {Math.floor((Date.now() - e.time) / 1000) < 60 ? (
            <p className="timeStamp">
              {Math.floor((Date.now() - e.time) / 1000)} second ago
            </p>
          ) : Math.floor((Date.now() - e.time) / 60000) < 60 ? (
            <p className="timeStamp">
              {Math.floor((Date.now() - e.time) / 60000)} min ago
            </p>
          ) : Math.floor((Date.now() - e.time) / (60000 * 24)) <= 24 ? (
            <p className="timeStamp">
              {Math.floor((Date.now() - e.time) / (60000 * 24))} hr ago
            </p>
          ) : (
            <p className="timeStamp">
              {new Date(e.time).getDate()} /{new Date(e.time).getMonth()}/{" "}
              {new Date(e.time).getFullYear()} {new Date(e.time).getHours()}:
              {new Date(e.time).getMinutes()}
            </p>
          )}

          {/* <p className="timeStamp">
            {new Date(e.time).getDate()} /{new Date(e.time).getMonth()}/{" "}
            {new Date(e.time).getFullYear()} {new Date(e.time).getHours()}:
            {new Date(e.time).getMinutes()}
          </p> */}
          <div
            style={{
              width: "80%",
              margin: "auto",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
            {e.postText.split(/#\w+/g)}
          </div>
          <div className="tags">{e.tags}</div>

          {e.imageData &&
            e.imageData.map((elm) => (
              <img src={elm} alt="" style={{ width: "80%", height: "40vh" }} />
            ))}

          {/* <div className="rxn">
            <div onClick={() => handleFavoriteIcon(user.uid, e.id, e.heart)}>
             { 
             
             <FavoriteIcon
                style={{
                  cursor: "pointer",
                  color:
                    e.heart.map((el) => el === user.uid) && e.id === idx
                      ? "blue"
                      : "grey",
                }}
              />}
            </div>

            <div onClick={() => handlesmile(user.uid, e.id, e.smile)}>
              <InsertEmoticonIcon
                style={{
                  cursor: "pointer",
                  color:
                    e.smile.map((el) => el === user.uid) && e.id === idx1
                      ? "blue"
                      : "grey",
                }}
              />
            </div>
            <div onClick={() => handlelike(user.uid, e.id, e.like)}>
              <ThumbUpIcon  style={{
                  cursor: "pointer",
                  color:
                    e.smile.map((el) => el === user.uid) && e.id === idx2
                      ? "blue"
                      : "grey",
                }} />
            </div>
          </div> */}
          {/* <div className="rxn">
          <div  onClick={handleheart}>
            {
              heart?
             <FavoriteIcon  style={{color:"blue"}} />:<FavoriteIcon/>
            }
            </div>
            <div onClick={handleemotion}>
            {
              emotion?
             <InsertEmoticonIcon  style={{color:"blue"}} />:<InsertEmoticonIcon/>
            }
            </div>
            <div onClick={handlelike}>
            {
              like?
             <ThumbUpIcon  style={{color:"blue"}} />:<ThumbUpIcon/>
            }
            </div>
          </div> */}
          <div className="rxn">
            <div>
              <label for="box">
                <div
                  className="checkbox"
                  onClick={() => {
                    handleFavoriteIcon(e.uid);
                  }}
                >
                  <input type="checkbox" id="box" />
                  <FavoriteIcon
                    className="favicon"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </label>
            </div>

            <div>
              <label for="box1">
                <div
                  className="checkbox"
                  onClick={() => {
                    handleFavoriteIcon(e.uid);
                  }}
                >
                  <input type="checkbox" id="box1" />
                  <InsertEmoticonIcon
                    className="favicon"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </label>
            </div>

            <div>
              <label for="box">
                <div
                  className="checkbox"
                  onClick={() => {
                    handleFavoriteIcon(e.uid);
                  }}
                >
                  <input type="checkbox" id="box" />
                  <ThumbUpIcon
                    className="favicon"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};
