import { Container } from "@mui/material";
import Select, { components } from "react-select";
import { useState,useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axiosConfig from "../Util/AxiosConfig";
import SeedPaperCard from "./SeedPaperCard";

export const PaperSearchBar = ({ seedPaper, setSeedPaperFunc }) => {
  const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
  const [seedPaperData, setSeedPaperData] = useState({});
  
  // useEffect(() => {
  //   console.log(seedPaper)
  // },[seedPaper]);

  const getPaperDetails = (seedPaperDetails) => {
    axiosConfig
      .get("/api/papers/" + seedPaperDetails)
      .then((response) => {
        console.log("Response : ", response);
        setSeedPaperData(response?.data?.data);
        let references = response?.data?.data;
        console.log("URL : ", references?.url);
        console.log("Year : ", references?.year);
        console.log("Abstract : ", references?.abstract);
        console.log("Title : ", references?.title);
        console.log(
          "Authors : ",
          references?.authors?.map((authorName) => authorName.name)
        );
        console.log(
          "References : ",
          references?.references?.filter((item) => item.paperId !== "")
        );
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };
  const handleInputChange = (newInput) => {
    console.log("Handle onchange: ", newInput);
    setSearchTerm(newInput);
    axiosConfig
      .get("/api/papers/autocomplete", {
        params: {
          query: newInput,
        },
      })
      .then((response) => {
        let paperList = response?.data?.data;
        let opts = paperList?.map((paperDetails) => {
          return {
            label: paperDetails?.title,
            value: paperDetails?.id,
          };
        });
        console.log("Opts: ", opts);
        setData(opts);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  };
  const handleChange = (paper) => {
    console.log("Paper : ", paper);
    if (paper) {
        setSeedPaperFunc(paper.value);
        getPaperDetails(paper.value)
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
        placeholder={searchTerm.length > 0 ? searchTerm : "Search Seed Papers"}
        value={searchTerm}
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
      {/* {seedPaper.value} */}
      <SeedPaperCard seedPaperDetails={seedPaperData} />
    </Container>
  );
};
