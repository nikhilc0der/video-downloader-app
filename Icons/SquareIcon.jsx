import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SquareIcon({ size, color }) {
  return (
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
      <Path
        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        stroke="none"
      />
    </Svg>
  );
}

export default SquareIcon;
