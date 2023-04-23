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
import SearchData from './ProjectPage'


// import citationImage from "../assets/citationImage.png";
// import treeImage from "../assets/ourlogo.jpeg";
// import classes from "../components/Layout/Header.module.css";

import Header from "../components/Layout/Header"

function Dashboard() {

  return (
    <Fragment>
        <Header />
        {/* <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <div>
          <TextField
              id="search-required"
              label="Search"
              defaultValue=""
              variant="standard"
              sx={{ marginLeft: 3}}
              value={this.state.search}
              onChange={(e) => {
                this.searchNameChanged(e);
              }}
            />
            <Button 
              variant="contained"
              component="label"
              onClick={() => this.searchClicked()}
              sx={{marginLeft: 2}}
            >
              <SearchOutlinedIcon /> Search
            </Button>
          </div>
        </Stack>

        <Stack
          direction="row"
          justifyContent="left"
          alignItems="left"
          spacing={2}
          paddingLeft={10}
        >
          <CardItem collections={this.state.collections} behaviour={"tag"} width={300}/>
          <CardItem collections={this.state.collectionFiles} behaviour={"files"} width={900}/>

      </Stack> */}
      <div className="App">
        {/* <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
        <div>
          <Button 
            variant="contained"
            component="label"
            onClick={searchClicked}
            sx={{marginLeft: 2}}
          >
            <SearchOutlinedIcon /> Search
          </Button>
        </div> */}
        <SearchData />
      </div>
    </Fragment>
  );
}

export default Dashboard;
