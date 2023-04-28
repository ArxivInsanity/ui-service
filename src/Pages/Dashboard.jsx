import { Fragment, useEffect } from "react";

import "./Dashboard.css";
import SearchData from '../Components/ProjectComponent'
import Box from '@mui/material/Box';


// import citationImage from "../Assets/citationImage.png";
// import treeImage from "../Assets/ourlogo.jpeg";
// import classes from "../Components/Layout/Header.module.css";

import Header from "../Components/Layout/Header"

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
