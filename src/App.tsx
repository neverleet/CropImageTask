import React from "react";
import ImageEditor from "./components/ImageEditor";
import { ImageProps } from "./types";

const App: React.FC = () => {
  const imageProps: ImageProps = {
    src: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    crop: { x: 1, y: 1, w: 1000, h: 666 },
    objects: [
      { point: { x: 25, y: 25 }, type: "arrow", comment: "Cтрелка 1" },
      { point: { x: 11, y: 11 }, type: "arrow", comment: "Cтрелка 2" },
    ],
  };

  return (
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <ImageEditor props={imageProps} imageWidth={imageProps.crop.w} imageHeight={imageProps.crop.h} />
    </div>
  );
};

export default App;
