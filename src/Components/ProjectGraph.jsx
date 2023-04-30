import { useEffect, useState } from "react";
import { Paper, Grid, Box, Slider } from "@mui/material";
import axiosConfig from "../Util/AxiosConfig";
import GraphComponent from "./GraphComponent";
import Select from "react-select";

const ProjectGraph = ({ paperId }) => {
  const [data, setData] = useState(null);

  // filter states
  const [authorList, setAuthorList] = useState([
    { label: "Pawan", value: 1 },
    { label: "AC", value: 2 },
    { label: "Anush", value: 3 },
  ]);
  const [yearRange, setYearRange] = useState([2000, 2023]);
  const [minMaxYear, setMinMaxYear] = useState([1800, 2023])
  const [minCitation, setMinCitation] = useState(0);

  useEffect(() => {
    axiosConfig
      .get("api/graph/" + paperId)
      .then((response) => {
        console.log("Graph Data", response);
        let graphData = response.data.data;
        setData(graphData);

        // set filter params
        let tmpAuthorList = [];
        let maxYear = 0;
        let minYear = 2023;
        graphData?.nodes.map((node) => {
          node.authorList.map((authorName) => tmpAuthorList.push(authorName));
          if (node.year > maxYear) {
            maxYear = node.year;
          }
          if (node.year < minYear) {
            minYear = node.year;
          }
        });
        let uniqueAuthorList = [...new Set(tmpAuthorList)]
        setAuthorList(
          uniqueAuthorList.map((author) => {
            return { value: author, label: author };
          })
        );

        console.log("Author Set: ", uniqueAuthorList)
        setMinMaxYear([minYear, maxYear])
        console.log("MinMaxYear: ", minYear, maxYear)
        
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  }, [paperId]);

  return (
    <>
      {paperId != "" ? (
        <Grid container spacing={1} direction="column">
          <Grid item xs={8}>
            <GraphComponent data={data} />
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Select id="authorSearch" placeholder="Select Author to Filter" isMulti options={authorList} />
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      min={minMaxYear[0]}
                      max={minMaxYear[1]}
                      value={yearRange}
                      onChange={(event, newValue) => {
                        setYearRange(newValue);
                      }}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ width: 300 }}>
                    <Slider
                      min={0}
                      max={300}
                      value={minCitation}
                      onChange={(event, newValue) => {
                        setMinCitation(newValue);
                      }}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper
          sx={{
            width: "100%",
            height: "100%",
          }}
        ></Paper>
      )}
    </>
  );
};

export default ProjectGraph;
