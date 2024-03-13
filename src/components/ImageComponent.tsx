import React, { ReactNode } from "react";
import { ImageProps } from "../types";

interface ImageComponentProps extends ImageProps {
  children: ReactNode;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, crop, objects, children }) => {
  const containerStyle: React.CSSProperties = {
    width: `${crop.w}px`,
    height: `${crop.h}px`,
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      <img
        src={src}
        alt="img"
        style={{ position: "absolute", left: `-${crop.x}px`, top: `-${crop.y}px`, width: "auto", height: "auto" }}
      />
      {children}
    </div>
  );
};

export default ImageComponent;
