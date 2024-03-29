import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { scaleLinear } from "d3-scale";
import axios from "axios";

import "./Map.scss"

const Map = ({ width, height, nodes, links, minX, maxX, minY, maxY }) => {
  var xScale = scaleLinear()
    .domain([minX, maxX])
    .range([0, width]);
  var yScale = scaleLinear()
    .domain([minY, maxY])
    .range([0, height]);

  return (
    <div className="map-container" id="map">
      <svg
        className="map-svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {links.map((link, i) => (
          <line
            key={i}
            x1={xScale(link.x1)}
            x2={xScale(link.x2)}
            y1={yScale(link.y1)}
            y2={yScale(link.y2)}
            strokeWidth={2}
            stroke={"white"}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={xScale(node.x)}
            cy={yScale(node.y)}
            r="7"
            fill={node.done === true ? "white" : "white"}
          />
        ))}
      </svg>
    </div>
  );
}

export default Map;