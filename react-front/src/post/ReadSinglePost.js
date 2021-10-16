import React from "react";
import Sidebar from "../sidebar/Sidebar.js";
import SinglePost from "./SinglePost.js";
import "./readSinglePost.css";

export default function ReadSinglePost() {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}