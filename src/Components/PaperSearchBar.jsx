import { Container } from "@mui/material";
import Select, { components } from "react-select";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axiosConfig from "../Util/AxiosConfig";
import SeedPaperCard from "./SeedPaperCard";

export const PaperSearchBar = ({ setSeedPaperFunc }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [seedPaperData, setSeedPaperData] = useState({});

  useEffect(() => {
    console.log("SHIT : ",data);
  }, [data]);

  useEffect(() => {
    console.log("2nd SHIT : ", seedPaperData);
  }, [seedPaperData]);

  const getPaperDetails = (seedPaperDetails) => {
    axiosConfig
      .get("/api/papers/" + seedPaperDetails)
      .then((response) => {
        console.log("Response : ", response);
        if (response?.data?.data !== null) {
          setSeedPaperData(response?.data?.data);
        }
        // let references = response?.data?.data;
        // console.log("URL : ", references?.url);
        // console.log("Year : ", references?.year);
        // console.log("Abstract : ", references?.abstract);
        // console.log("Title : ", references?.title);
        // console.log(
        //   "Authors : ",
        //   references?.authors?.map((authorName) => authorName.name)
        // );
        // console.log(
        //   "References : ",
        //   references?.references?.filter((item) => item.paperId !== "")
        // );
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };
  const handleInputChange = (newInput) => {
    console.log("Handle onInputchange: ", newInput);
    // setSearchTerm(newInput);
    if (newInput?.length >= 3) {
      axiosConfig
        .get("/api/papers/autocomplete", {
          params: {
            query: newInput,
          },
        })
        .then((response) => {
          let paperList = response?.data?.data;
          if (paperList) {
            let opts = paperList?.map((paperDetails) => {
              return {
                label: paperDetails?.title,
                value: paperDetails?.id,
              };
            });
            console.log("Opts: ", opts);
            setData(opts);
          }
        })
        .catch((error) => {
          console.log("Error Failed", error);
        });
    }
    
  };
  const handleChange = (paper) => {
    console.log("on Change : ", paper);
    if (paper?.value) {
      setSeedPaperFunc(paper.value);
      getPaperDetails(paper.value);
    }
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <Container maxWidth="md" sx={{ p: 1 }} disableGutters>
      <Select
        id="search"
        type="search"
        label="Search"
        components={{ DropdownIndicator }}
        placeholder={"Search Seed Papers"}
        // value={searchTerm}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            fontSize: 14,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            fontSize: 14,
          }),
        }}
        onInputChange={(newInput) => {
          handleInputChange(newInput);
        }}
        onChange={(value) => {
          handleChange(value);
        }}
        options={data}
      />
      {Object.keys(seedPaperData).length > 0 &&
        <SeedPaperCard seedPaperDetails={seedPaperData} />
      }
    </Container>
  );
};
