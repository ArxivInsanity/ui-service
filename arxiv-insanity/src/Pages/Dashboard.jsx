import { Fragment } from "react";

import "./Dashboard.css";
import SearchData from '../components/ProjectComponent'
import Box from '@mui/material/Box';


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"

function Dashboard() {
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
