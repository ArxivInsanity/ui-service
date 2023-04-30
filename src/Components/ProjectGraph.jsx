import { useEffect, useState } from "react";
import G6 from "@antv/g6";
import axiosConfig from "../Util/AxiosConfig";

const ProjectGraph = ({ paperId }) => {
  const [data, setData] = useState(null);

  const width = 1100;
  const height = 600;
  let graph = null;
  // const { predictLayout, confidence } = await GraphLayoutPredict.predict(data);
  useEffect(() => {
    axiosConfig
      .get("api/graph/" + paperId)
      .then((response) => {
        console.log("Graph Data", response);
        setData(response.data.data);
        // graph call
        drawGraph(graph, response.data.data);
      })
      .catch((error) => {
        console.log("Error Failed", error);
      });
  }, [paperId]);


};

export default ProjectGraph;
