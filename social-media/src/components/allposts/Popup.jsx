import * as React from "react";
import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { db } from "../../config/firebase-config";
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Edit } from "../edit/Edit";
import { Routes, Route } from "react-router-dom";

export default function Popup(props) {
  const [data, setData] = useState([]);

  var posts = collection(db, "posts");
  // console.log("ps", posts);

  async function getdata() {
    var res = await getDocs(posts);
    setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getdata();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  var postscollection = collection(db, "posts");

  const deletepost = async (id) => {
    var path = doc(postscollection, id);
    await deleteDoc(path);
    alert("post deleted");
    window.location.reload();
    getdata();
  };
  // const navigate= useNavigate()

  const handleEdit = (props) => {
    sessionStorage.setItem("data", JSON.stringify(props));
  };

  return (
    <div>
      <Button aria-describedby={id} variant="" onClick={handleClick}>
        <MoreHorizIcon></MoreHorizIcon>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popup">
          <Link to="/edit">
            <button className="delbtn" onClick={() => handleEdit(props)}>
              Edit
            </button>
          </Link>

          <button className="delbtn" onClick={() => deletepost(props.item.id)}>
            Delete
          </button>
        </div>
      </Popover>
    </div>
  );
}
