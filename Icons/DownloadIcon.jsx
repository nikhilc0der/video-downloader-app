import React from "react";
import { Path, Svg } from "react-native-svg";

function DownloadIcon({ size, color }) {
  return (
    <>
      <Svg
        stroke={color}
        fill={color}
        strokeWidth={0}
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path fill="none" d="M0 0h24v24H0z" stroke="none" />
        <Path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" stroke="none" />
      </Svg>
    </>
  );
}

export default DownloadIcon;
