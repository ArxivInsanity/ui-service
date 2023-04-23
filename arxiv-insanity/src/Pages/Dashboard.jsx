import { Fragment } from "react";
// import React, { useState } from 'react';
// import axios from "axios";

// import Stack from "@mui/material/Stack";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "./Dashboard.css";
// import { SearchBar } from "../components/SearchBar";
// import { SearchResultsList } from "../components/SearchResultsList";
import SearchData from '../components/ProjectComponent'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"
import { Button } from "@mui/material";

const onClickNewProject = () => {
  console.log("onClickNewProject");
}
function Dashboard() {

  return (
    <Fragment>
      <Box className="App">
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2
       }}>
          <Button variant="contained" startIcon={<OpenInNewIcon />} size="large" onClick={onClickNewProject}>
            New Project
          </Button>
        </Box>
        <SearchData />
      </Box>
    </Fragment>
  );
}

export default Dashboard;
