import React from "react";
import { G, Path, Svg } from "react-native-svg";

function MenuAltIcon({ color, size }) {
  return (
    <>
      <Svg
        stroke={color}
        fill={color}
        strokeWidth={0}
        version="1.1"
        viewBox="0 0 17 17"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <G />
        <Path d="M16 2v2h-11v-2h11zM5 9h11v-2h-11v2zM5 14h11v-2h-11v2zM2 2c-0.552 0-1 0.447-1 1s0.448 1 1 1 1-0.447 1-1-0.448-1-1-1zM2 7c-0.552 0-1 0.447-1 1s0.448 1 1 1 1-0.447 1-1-0.448-1-1-1zM2 12c-0.552 0-1 0.447-1 1s0.448 1 1 1 1-0.447 1-1-0.448-1-1-1z" />
      </Svg>
    </>
  );
}

export default MenuAltIcon;
