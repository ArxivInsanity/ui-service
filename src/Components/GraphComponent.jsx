import { useEffect, useState } from "react";
import G6 from "@antv/g6";
import { Paper } from "@mui/material";
import axiosConfig from "../Util/AxiosConfig";
import PaperDetailsModal from "./PaperDetailsModal";

const GraphComponent = ({ data }) => {
  const [openPaperDetailsModal, setOpenPaperDetailsModal] = useState(false);
  const [readingPaperDetails, setReadingPaperDetails] = useState({});

  useEffect(() => {
    let graph = null;
    graph = createGraph(graph, data);
    return () => {
      graph?.destroy();
    };
  }, [data]);

  const createGraph = (graph, data) => {
    console.log("Graph Data: ", data, "Graph: ", graph);
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
        height: 630,
        width: 950,
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
        console.log("Node Item: ", item._cfg.id);
        axiosConfig
          .get("/api/papers/" + item._cfg.id)
          .then((response) => {
            console.log("Reading Paper Details : ", response);
            if (response?.data?.data !== null) {
              setReadingPaperDetails(response?.data?.data);
              setOpenPaperDetailsModal(true);
            }
          })
          .catch((error) => {
            console.log("Error Failed", error);
          });
        graph.setItemState(item, "selected", true);
      });
      graph.on("canvas:click", (evt) => {
        graph.getNodes().forEach((node) => {
          graph.clearItemStates(node);
        });
      });
    }

    return graph;
  };

  return (
    <>
      <Paper>
        <div id="container"></div>
      </Paper>
      <PaperDetailsModal
        openRead={openPaperDetailsModal}
        handleClose={() => {
          setOpenPaperDetailsModal(false);
        }}
        refData={readingPaperDetails}
      />
    </>
  );
};

export default GraphComponent;
