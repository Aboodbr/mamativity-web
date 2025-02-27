/* eslint-disable react/prop-types */
import React from "react";

const CustomBar = (props) => {
  const { x, y, width, height } = props;

  // Define a unique gradient ID for each bar
  const gradientId = `gradient-${x}-${y}`;

  return (
    <g >
      {/* Define the gradient */}
      <defs >
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1" >
          <stop offset="0%" stopColor="#FFCFFA" stopOpacity={1}  /> 
          <stop offset="100%" stopColor="#CBF3FF" stopOpacity={1} />
        </linearGradient>
      </defs>

      {/* Render the bar with gradient and border */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${gradientId})`}
        rx={10} 
        ry={10} 
        
      />
    </g>
  );
};

export default CustomBar;