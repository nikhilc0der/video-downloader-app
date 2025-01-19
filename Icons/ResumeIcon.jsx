import React from "react";
import { Path, Svg } from "react-native-svg";

export default function ResumeIcon({ color, size }) {
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
      <Path d="M96 52v408l320-204L96 52z" stroke="none" />
    </Svg>
  );
}
