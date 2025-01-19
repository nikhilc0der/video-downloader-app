import React from "react";
import { Path, Svg } from "react-native-svg";

function FileIcon({ size, color }) {
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
        <Path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z" />
      </Svg>
    </>
  );
}

export default FileIcon;
