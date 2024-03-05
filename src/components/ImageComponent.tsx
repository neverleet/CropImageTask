import React from "react";
import {ImageProps} from "../types"

const ImageComponent: React.FC<ImageProps> = ({ src, crop, objects }) => {
  const imageStyle: React.CSSProperties = {
    position: "absolute",
    left: `-${crop.x}px`,
    top: `-${crop.y}px`,
    width: "auto",
    height: "auto",
  };

  const containerStyle: React.CSSProperties = {
    width: `${crop.w}px`,
    height: `${crop.h}px`,
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      <img src={src} style={imageStyle} />
      {objects.map((obj, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: `${obj.point.x}px`,
          top: `${obj.point.y}px`,
        }}>
          <div style={{fontSize: '24px'}}>⇒</div>
          {obj.comment && <div style={{ marginTop: '5px' }}>{obj.comment}</div>}
        </div>
      ))}
    </div>
  );
};

export default ImageComponent;
