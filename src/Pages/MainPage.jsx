import React from "react";
import "./Dashboard.css";
import Header from "../Components/Layout/Header";
import { useLocation } from "react-router-dom";
import { ProjectBreadCrumbs } from "../Components/ProjectBreadCrumbs";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import ProjectGraph from "../Components/ProjectGraph";


const MainPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const projectDetails = useLocation().state.data;
  console.log("STATE: ", projectDetails);
  return (
    <>
      <div className="App">
        <Header />
        <ProjectBreadCrumbs
          projectName={projectDetails.name}
        ></ProjectBreadCrumbs>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <h1>Project Graph Representation</h1>
              <ProjectGraph />
            </Item>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MainPage;
