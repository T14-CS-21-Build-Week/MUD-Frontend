import React, { useEffect } from "react";

import { scaleLinear } from "d3-scale";

import "./Map.scss"

// var mapStyles = { position: "relative", bottom: 700}
// var svgStyles = { position: "relative"}

const PlayerNode = ({ width, height, node,  minX, maxX, minY, maxY }) => {

  var xScale = scaleLinear()
    .domain([minX, maxX])
    .range([0, width]);
  var yScale = scaleLinear()
    .domain([minY, maxY])
    .range([0, height]);

  return (
    <div className="playernode-container" id="playernode">
      <svg
        // style={svgStyles}
        className="playernode-svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
          <circle
            cx={xScale(node.x)}
            cy={yScale(node.y)}
            r="6"
            color="red"
            fill={node.done === true ? "red" : "red"}
          />
      </svg>
    </div>
  );
}

export default PlayerNode;