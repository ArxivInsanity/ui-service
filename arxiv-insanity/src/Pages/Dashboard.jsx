import { Fragment } from "react";
// import React, { useState } from 'react';
// import axios from "axios";

// import Stack from "@mui/material/Stack";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import Button from "@mui/material/Button";
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "./Dashboard.css";
// import { SearchBar } from "../components/SearchBar";
// import { SearchResultsList } from "../components/SearchResultsList";
import SearchData from '../components/ProjectComponent'


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"

function Dashboard() {

  return (
    <Fragment>
        <Header />
      <div className="App">
        <SearchData />
      </div>
    </Fragment>
  );
}

export default Dashboard;
