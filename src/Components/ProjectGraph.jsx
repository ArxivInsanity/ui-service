import { useEffect, useState } from "react";
import { Paper, Grid, Box, Slider, Button, Typography } from "@mui/material";
import axiosConfig from "../Util/AxiosConfig";
import GraphComponent from "./GraphComponent";
import Select from "react-select";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { RingLoader } from "react-spinners";

const ProjectGraph = ({ paperId }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // filter states
  const [authorList, setAuthorList] = useState([]);
  const [authorFilterList, setAuthorFilterList] = useState([]);
  const [yearRange, setYearRange] = useState([1800, 2023]);
  const [minMaxYear, setMinMaxYear] = useState([1800, 2023]);
  const [minCitation, setMinCitation] = useState(0);

  useEffect(() => {
    console.log("Project Grpah : ", paperId);
    if (paperId) {
      setLoading(true);
      axiosConfig
        .get("api/graph/" + paperId)
        .then((response) => {
          console.log("Graph Data", response);
          let graphData = response?.data?.data;
          setData(graphData);

          // set filter params
          let tmpAuthorList = [];
          let maxYear = 0;
          let minYear = 2023;
          graphData?.nodes?.map((node) => {
            node?.authorList?.map((authorName) => tmpAuthorList.push(authorName));
            if (node?.year > maxYear) {
              maxYear = node?.year;
            }
            if (node?.year < minYear) {
              minYear = node?.year;
            }
          });
          let uniqueAuthorList = [...new Set(tmpAuthorList)];
          setAuthorList(
            uniqueAuthorList?.map((author) => {
              return { value: author, label: author };
            })
          );

          console.log("Author Set: ", uniqueAuthorList);
          setMinMaxYear([minYear, maxYear]);
          console.log("MinMaxYear: ", minYear, maxYear);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error Failed", error);
        });
    }
  }, [paperId]);

  // handle onClick of apply filter
  const applyFilterOnClick = () => {
    let filterParams = {};

    filterParams["authors"] = authorFilterList.join(",");
    filterParams["minYear"] = yearRange[0];
    filterParams["maxYear"] = yearRange[1];
    filterParams["minCitation"] = minCitation;

    console.log("Filter Params: ", filterParams);

    axiosConfig
      .get("api/graph/" + paperId, { params: filterParams })
      .then((response) => {
        console.log("Filtered Graph Data", response);
        let filteredGraphData = response.data.data;
        setData(filteredGraphData);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };

  return (
    <>
      {paperId !== "" ? (
        <Grid container spacing={1} direction="column">
          <Grid item xs={8}>
            {isLoading ? (
              <Paper
                sx={{
                  width: "100%",
                  height: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RingLoader loading={isLoading} size={300} color="maroon" />
                <Typography
                  sx={{
                    m: 1,
                    pl: 5,
                    fontSize: 64,
                    fontWeight: "bold",
                  }}
                  color="#8a2b06"
                >
                  Loading ....
                </Typography>
              </Paper>
            ) : (
              <GraphComponent data={data} />
            )}
          </Grid>
          <Grid item xs={3}>
            <Paper sx={{ mt: 1, height: 100, boxShadow: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      m: 1,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    color="#8a2b06"
                  >
                    Author
                  </Typography>
                  <Box sx={{ width: 300, pl: 1, mb: 1 }}>
                    <Select
                      id="authorSearch"
                      isMulti
                      options={authorList}
                      onChange={(newValue) => {
                        setAuthorFilterList(
                          newValue.map((author) => author.value)
                        );
                      }}
                      menuPlacement="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      m: 1,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    color="#8a2b06"
                  >
                    Year
                  </Typography>
                  <Box sx={{ width: 200, pl: 2 }}>
                    <Slider
                      min={minMaxYear[0]}
                      max={minMaxYear[1]}
                      sx={{
                        mt: 0.5,
                      }}
                      value={yearRange}
                      onChange={(event, newValue) => {
                        setYearRange(newValue);
                      }}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      m: 1,
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    color="#8a2b06"
                  >
                    Min Citation
                  </Typography>
                  <Box sx={{ width: 200, pl: 2 }}>
                    <Slider
                      min={0}
                      max={300}
                      value={minCitation}
                      sx={{
                        mt: 0.5,
                      }}
                      onChange={(event, newValue) => {
                        setMinCitation(newValue);
                      }}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </Grid>
                <Grid container item xs={2}>
                  <Box>
                    <Button
                      id="apply-filter"
                      variant="outlined"
                      size="medium"
                      color="primary"
                      sx={{
                        mt: 2,
                        fontSize: 14,
                        border: 1,
                        boxShadow: 2,
                      }}
                      onClick={applyFilterOnClick}
                      startIcon={<FilterAltIcon />}
                    >
                      Apply Filter
                    </Button>
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
