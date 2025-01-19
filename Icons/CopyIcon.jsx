import React from "react";
import { Path, Svg } from "react-native-svg";

export default function CopyIcon({ color, size }) {
  return (
    <>
      <Svg
        stroke={color}
        fill={color}
        strokewidth={0}
        viewBox="0 0 512 512"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z" />
        <Path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z" />
      </Svg>
    </>
  );
}
