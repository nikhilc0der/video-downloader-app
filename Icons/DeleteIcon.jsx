import React from "react";
import { Path, Svg } from "react-native-svg";

function DeleteIcon({ color, size }) {
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
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </Svg>
    </>
  );
}

export default DeleteIcon;
