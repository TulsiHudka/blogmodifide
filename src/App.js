import React , { useState } from "react";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import { ProfileMenu } from "./context/ProfileMenu";
import BlogPost from "./components/BlogPost";
import EditBlog from "./components/EditBlog";
import AddBlog from "./components/AddBlog";
// import { useSelector } from "react-redux";
import {Provider} from "react-redux";
import { store } from "./Store/Index";
import MyBlog from "./components/MyBlog";

function App() {
  // const [email, emailupdate] = useState('');
  // const [password, passwordupdate] = useState('');
  const [checkRole, checkRoledupdate] = useState(false);
  const [checkLogin, checkLogindupdate] = useState(false);
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
      <ProfileMenu.Provider value={{checkRole, checkRoledupdate, checkLogin, checkLogindupdate}}>    
        <Navbar />
        <Routes>
          <Route path="/" element={<Blogs />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/:blogId" element={<BlogPost />}></Route>
          <Route path="/edit/:id" element={<EditBlog />}></Route>
          <Route path="/addBlog" element={<AddBlog />}></Route>
          <Route path="/myBlog" element={<MyBlog />}></Route>
          </Routes>
        </ProfileMenu.Provider>
      </BrowserRouter>
      </Provider>   
    </div>
  );
}

export default App;
