import { useEffect, useState } from "react";
import G6 from "@antv/g6";
import axiosConfig from "../Util/AxiosConfig";

const ProjectGraph = ({ paperId }) => {
  //   let data = null;
  const [data, setData] = useState(null);

  const width = 1000;
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
  }, []);

  const drawGraph = (graph, data) => {
    console.log("Data: ", data, "Graph: ", graph);
    if (!graph && data) {
      data.edges.forEach((edge) => {
        edge.label = `References`;
      });

      const colors = {
        seed: "#61DDAA",
        notSeed: "#F08BB4",
      };

      data.nodes.forEach((node) => {
        node.donutColorMap = colors;
        node.size = 0;
        node.label = node.label.substring(0, 30) + "...";
        Object.keys(node.donutAttrs).forEach((key) => {
          node.size += node.donutAttrs[key];
        });
        node.size = Math.sqrt(node.size) * 5;
      });
      graph = new G6.Graph({
        container: "container",
        width,
        height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        fitView: true,
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        layout: {
          type: "force2",
          focusNode: "li",
          linkDistance: 100,
          unitRadius: 100,
        },
        defaultEdge: {
          style: {
            endArrow: true,
          },
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: "#fff",
              lineWidth: 5,
            },
          },
        },
        defaultNode: {
          type: "donut",
          style: {
            lineWidth: 0,
          },
          labelCfg: {
            position: "bottom",
          },
        },
      });

      graph.data(data);
      graph.render();

      graph.on("node:mouseenter", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "active", true);
      });

      graph.on("node:mouseleave", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "active", false);
      });

      graph.on("node:click", (evt) => {
        const { item } = evt;
        graph.setItemState(item, "selected", true);
      });
      graph.on("canvas:click", (evt) => {
        graph.getNodes().forEach((node) => {
          graph.clearItemStates(node);
        });
      });
    }
  };

  return;
};

export default ProjectGraph;
