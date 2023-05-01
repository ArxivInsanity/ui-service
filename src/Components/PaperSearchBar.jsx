import { Container } from "@mui/material";
import Select, { components } from "react-select";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axiosConfig from "../Util/AxiosConfig";

export const PaperSearchBar = ({ setSeedPaperFunc }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Set Options : ", data);
  }, [data]);

  const handleInputChange = (newInput) => {
    console.log("Handle onInputchange: ", newInput);

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
        value={"Search Seed Papers"}
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
    </Container>
  );
};
