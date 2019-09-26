import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { scaleLinear } from "d3-scale";
import axios from "axios";

var mapStyles = { position: "relative" }
// var svgStyles = { position: "absolute", top: 100, left: 500, right: 0, bot", width: '100%'}tom: 0 };  
var svgStyles = { position: "relative", width: '100%'}

const Map = ({ width, height, nodes, links }) => {
  var xScale = scaleLinear()
    .domain([1, 20])
    .range([0, width]);
  var yScale = scaleLinear()
    .domain([0, 20])
    .range([100, height]);

  return (
    <div id="map" style={mapStyles}>
      <svg
        style={svgStyles}
        width={width}
        height={height}
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
            stroke={"grey"}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={xScale(node.x)}
            cy={yScale(node.y)}
            r="10"
            fill={node.done === true ? "cyan" : "grey"}
          />
        ))}
      </svg>
    </div>
  );
}

export default Map;