// import logo from './logo.svg';
import "./App.css";
import { Login } from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import { CreatePost } from "./components/createpost/CreatePost";
import { Allposts } from "./components/allposts/Allposts";
import Profile from "./components/profile/Profile";
import { Edit } from "./components/edit/Edit";

function App() {
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
