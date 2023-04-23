import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  // const fetchData = (value) => {
  //   fetch("http://localhost:8080/api/projects")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const results = json.filter((project) => {
  //         return (
  //           project &&
  //           project.name &&
  //           project.name.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //     });
  // };

  const fetcProjectDetails = (value) => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/projects",
      withCredentials: true,
    })
    .then((response) => {
      console.log("Got Collection Success", response);
      // const results = response.filter((data) => {
      //   return (
      //     data &&
      //     data.name &&
      //     data.name.toLowerCase().includes(value)
      //   );
    //});
      const results = response.data;
      setResults(results);
    })
    .catch((error) => {
      console.log("Error Failed", error);
    });
  }

  const handleChange = (value) => {
    setInput(value);
    fetcProjectDetails(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
