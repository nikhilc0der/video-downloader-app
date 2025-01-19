import React from "react";
import { Path, Svg } from "react-native-svg";

function PlusIcon({ color, size }) {
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
        <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </Svg>
    </>
  );
}

export default PlusIcon;
