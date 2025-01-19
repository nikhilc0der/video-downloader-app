import React from "react";
import { Path, Svg } from "react-native-svg";

function ThreedotIcon({ color, size }) {
  return (
    <>
      <Svg
        stroke={color}
        fill={color}
        strokeWidth={0}
        viewBox="0 0 16 16"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </Svg>
    </>
  );
}

export default ThreedotIcon;
