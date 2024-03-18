import React, { useState, ChangeEvent } from "react";
import ImageComponent from "./ImageComponent";
import DraggableArrow from "./DraggableArrow";
import { ImageProps, ImageObject } from "../types";

interface ImageEditorProps {
  props: ImageProps;
  imageWidth: number;
  imageHeight: number;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ props, imageWidth, imageHeight }) => {
  const [redactedImg, setRedactedImg] = useState(props);
  const [crop, setCrop] = useState(props.crop);
  const [arrows, setArrows] = useState(props.objects);
  const [newArrow, setNewArrow] = useState<ImageObject>({ point: { x: 50, y: 50 }, type: "arrow", comment: "" });

  const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCrop((prevCrop) => ({
      ...prevCrop,
      [name]: value,
    }));
  };

  const CropClick = () => {
    setRedactedImg((prevImg) => ({
      ...prevImg,
      crop: crop,
      objects: arrows,
    }));
  };

  // const ArrowInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewArrow  ((prevArrow) => ({
  //     ...prevArrow,
  //     point: { ...prevArrow.point, [name]: parseInt(value) },
  //   }));
  // };

  const ArrowTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewArrow((prevArrow) => ({
      ...prevArrow,
      comment: value,
    }));
  };

  const AddArrowClick = () => {
    AddArrow();
    setRedactedImg((prevImg) => ({
      ...prevImg,
      objects: [...arrows, newArrow],
    }));
  };

  const AddArrow = () => {
    setArrows((prevArrows) => [...prevArrows, newArrow]);
    setRedactedImg((prevImg) => ({
      ...prevImg,
      objects: arrows,
    }));
  };

  const handleDrag = (id: string, x: number, y: number) => {
    const newX = (x / imageWidth) * 100;
    const newY = (y / imageHeight) * 100;

    const withinBoundsX = newX >= 0 && newX <= 95;
    const withinBoundsY = newY >= 0 && newY <= 95;

    if (withinBoundsX && withinBoundsY) {
      const updatedArrows = arrows.map((arrow) => {
        if (arrow.comment === id) {
          return {
            ...arrow,
            point: { x: newX, y: newY },
          };
        }
        return arrow;
      });

      setArrows(updatedArrows);
    }
  };

  const DisplayData = () => {
    const objectStrings = arrows.map((obj) => {
      return `${Math.ceil(obj.point.x)},${Math.ceil(obj.point.y)}:${obj.type}:${obj.comment}`;
    });

    const objectsStr = `[${objectStrings.join("; ")}]`;

    console.log(
      `{% img src='${redactedImg.src}' crop="x:${redactedImg.crop.x}, y:${redactedImg.crop.y}, ${redactedImg.crop.w}-${redactedImg.crop.h}" objects=${objectsStr} %}`
    );
  };

  return (
    <div>
      <input name="x" placeholder="x фото" type="text" onChange={InputChange} />
      <input name="y" placeholder="y фото" type="text" onChange={InputChange} />
      <input name="w" placeholder="ширина" type="text" onChange={InputChange} />
      <input name="h" placeholder="высота" type="text" onChange={InputChange} />
      <button onClick={CropClick}>Обрезать</button>

      {/* <input style={{ marginLeft: "20px" }} placeholder="текст" type="text" onChange={ArrowTextChange} /> */}
      <button style={{ marginLeft: "20px" }} onClick={AddArrowClick}>
        Добавить Стрелку
      </button>
      <button onClick={DisplayData}>Данные об изображении</button>

      <ImageComponent {...redactedImg}>
        {arrows.map((arrow, index) => (
          <DraggableArrow key={index} arrow={arrow} onDrag={(id, x, y) => handleDrag(id, x, y)} />
        ))}
      </ImageComponent>
    </div>
  );
};

export default ImageEditor;
