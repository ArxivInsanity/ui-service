import { Fragment, useEffect } from "react";

import "./Dashboard.css";
import SearchData from '../components/ProjectComponent'
import Box from '@mui/material/Box';


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"

function Dashboard() {

  // useEffect(() => {
  //   const url = window.location.href;
  //   console.log("URL: ", url.split("token=")[1]);
  //   sessionStorage.setItem("token", url.split("token=")[1]);
  // }, []);

  return (
    <Fragment>
      <Box className="App">
        <Header />
        <SearchData />
      </Box>
    </Fragment>
  );
}

export default Dashboard;
