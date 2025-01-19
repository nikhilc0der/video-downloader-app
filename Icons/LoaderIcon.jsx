import * as React from "react";
import Svg, { Circle } from "react-native-svg";

function LoaderIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "#fff",
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      shapeRendering="auto"
      {...props}
    >
      <Circle
        cx={50}
        cy={50}
        r={32}
        strokeWidth={8}
        stroke="#e15b64"
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
      ></Circle>
      <Circle
        cx={50}
        cy={50}
        r={23}
        strokeWidth={8}
        stroke="#f8b26a"
        strokeDasharray="36.12831551628262 36.12831551628262"
        strokeDashoffset={36.12831551628262}
        fill="none"
        strokeLinecap="round"
      ></Circle>
    </Svg>
  );
}

export default LoaderIcon;
