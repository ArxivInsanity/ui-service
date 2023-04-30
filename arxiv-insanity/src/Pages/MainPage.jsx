import React, { useState } from "react";
import Header from "../components/Layout/Header";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { ProjectBreadCrumbs } from "../components/ProjectBreadCrumbs";
import { Box, Paper, Typography } from "@mui/material";
import { PaperSearchBar } from "../components/PaperSearchBar";

const MainPage = () => {
  const [seedPaperId, setSeedPaperId] = useState("");
  const projectDetails = useLocation().state.data;
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
            borderRadius: 0,
          }}
        >
          <Grid sx={{ flexGrow: 1 }} container spacing={1}>
            <Grid item xs={4}>
              <Paper sx={{ flexGrow: 1, borderRadius: 0 }}>
                <PaperSearchBar
                  seedPaper={seedPaperId}
                  setSeedPaperFunc={setSeedPaperId}
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
                          <Paper sx={{ flexGrow: 1, borderRadius: 0 }}>{seedPaperId}</Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default MainPage;