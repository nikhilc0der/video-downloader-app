import React from "react";
import { Path, Svg } from "react-native-svg";

function PauseIcon({ size, color }) {
  return (
    <Svg
      stroke={color}
      fill={color}
      strokeWidth={0}
      viewBox="0 0 512 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M199.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8zm176 0h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z"
        stroke="none"
      />
    </Svg>
  );
}

export default PauseIcon;
