import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  console.log("profile", profile);

  const TOKEN = currentUser?.token;

  console.log(TOKEN);

  const userInfo = async () => {
    const res = await axios.get(
      "https://user-sector-app.vercel.app/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    setProfile(res.data);
    console.log("USER INFO::::>>>", res.data);
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <div>
      <nav className="bg-blue-600 text-white flex justify-between px-6 py-2 font-medium">
        <Link to="/">App</Link>
        <div
          onClick={() => dispatch({ type: "LOGOUT" })}
          className="flex justify-center items-center gap-2"
        >
          <Link to="#"><LogoutOutlined /> Logout</Link>
        </div>
      </nav>

      <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col bg-blue-600 w-72 rounded-md p-4 m-4 text-white">
          <span>Name: {profile.username}</span>
          <span>Email: {profile.email}</span>
          <span>Sectors: {profile.sectors?.map((s) => (<span> {s.label} &nbsp;</span>))}</span>

          <button className="bg-gray-400 flex justify-center rounded-md p-1">
            <Link to="/form" className="gap-2">
              <EditOutlined /> Update
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
