import React, { useState, useEffect } from "react";
import Header from "../Components/Layout/Header";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { ProjectBreadCrumbs } from "../Components/ProjectBreadCrumbs";
import { Box, Paper } from "@mui/material";
import { PaperSearchBar } from "../Components/PaperSearchBar";
import ProjectGraph from "../Components/ProjectGraph";
import SeedPaperCard from "../Components/SeedPaperCard";
import SeedPaperList from "../Components/SeedPaperList";

const MainPage = () => {
  const [seedPaperId, setSeedPaperId] = useState("");
  const [projectList, setProjectList] = useState([]);
  const projectDetails = useLocation().state.data;
  useEffect(() => {
    console.log("Main Page seeedPaperId called");
    setSeedPaperId(projectDetails?.seedPapers[0]?.id);
    setProjectList(projectDetails?.seedPapers);
  }, [projectDetails]);
  console.log("STATE: ", projectDetails);
  return (
    <>
      <div className="App">
        <Header />
        <ProjectBreadCrumbs
          projectName={projectDetails.name}
        ></ProjectBreadCrumbs>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderRadius: 1,
          }}
        >
          <Grid sx={{ flexGrow: 1 }} container spacing={1}>
            <Grid item xs={4}>
              <Paper sx={{ flexGrow: 1, borderRadius: 1 }}>
                <PaperSearchBar setSeedPaperFunc={setSeedPaperId} />
                {Object.keys(projectList).length > 0 && (
                  <SeedPaperList
                    seedPapers={projectList}
                    setSeedPaperIdFunc={setSeedPaperId}
                    setProjectListFunc={setProjectList}
                    projectName={projectDetails?.name}
                  />
                )}
                {seedPaperId !== "" ? (
                  <SeedPaperCard seedPaperId={seedPaperId} setProjectListFunc={setProjectList} projectName={projectDetails?.name} />
                ) : (
                  <Paper
                    id="container"
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  ></Paper>
                )}
              </Paper>
            </Grid>
            <Grid item xs={8}>
              {seedPaperId !== "" ? (
                <ProjectGraph paperId={seedPaperId} />
              ) : (
                <Paper
                  id="container"
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                ></Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MainPage;
