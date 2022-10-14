// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import { Login } from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { CreatePost } from "./components/createpost/CreatePost";
import { Allposts } from "./components/allposts/Allposts";
import Profile from "./components/profile/Profile";
import { Edit } from "./components/edit/Edit";

import addNotification from "react-push-notification";

import { db } from "./config/firebase-config";

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

function App() {
  //   async function requestPermission() {
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

  // const notify=()=>{
  //   addNotification({
  //     title: 'Warning',
  //     native:true
  //   })
  // }
  const [notificationData, setNotificationData] = useState({});
  var notify = collection(db, "notification");
  const q = query(notify, orderBy("time"));

  useEffect(() => {
    getnotification();
  }, []);

  var user = JSON.parse(localStorage.getItem("user"));

  async function getnotification() {
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setNotificationData(doc.data());
      });
    });
  }

  console.log("notify", notificationData);

  // notificationData.sort((a, b) => b.time - a.time)
  function showNotification() {
    if (notificationData.receiverId === user.uid) {
      addNotification({
        title: "TechX",
        message: notificationData.senderName + " " + notificationData.text,
        native: true,
      });
    }
  }
  useEffect(() => {
    if (notificationData.receiverId === user.uid) {
      showNotification();
    }
  }, [notificationData.time]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/allposts" element={<Allposts />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
