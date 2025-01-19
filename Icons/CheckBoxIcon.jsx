import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CheckBoxIcon({ size, color }) {
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
      <Path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.413-1.414-5.657 5.657-2.829-2.829-1.414 1.414L11.003 16z"
        stroke="none"
      />
    </Svg>
  );
}

export default CheckBoxIcon;
