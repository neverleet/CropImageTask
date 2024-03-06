import React from "react";
// import ImageComponent from "./components/ImageComponent";
import ImageEditor from "./components/ImageEditor";

const App: React.FC = () => {
  const imageProps = {
    src: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",
    crop: { x: 1, y: 1, w: 1000, h: 652 },
    objects: [
      { point: { x: 25, y: 25 }, type: "arrow", comment: "Cтрелка 1" },
      { point: { x: 345, y: 65 }, type: "arrow", comment: "Cтрелка 2" },
    ],
  };

  return (
    <div className="App">
      {/* <ImageComponent {...imageProps} /> */}
      <ImageEditor props={imageProps} />
    </div>
  );
};

export default App;
