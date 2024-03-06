import React, { useState, ChangeEvent } from "react";
import ImageComponent from "./ImageComponent";
import { ImageProps } from "../types";

interface ImageEditorProps {
  props: ImageProps;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ props }) => {
  const [redactedImg, setRedactedImg] = useState({ ...props });
  const [crop, setCrop] = useState({ ...redactedImg.crop });

  const [arrows, setArrows] = useState([...redactedImg.objects]);
  const [newArrow, setNewArrow] = useState({ point: { x: 0, y: 0 }, type: "arrow", comment: "" });

  const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCrop((e) => ({
      ...e,
      [name]: value,
    }));
  };

  const CropClick = () => {
    setRedactedImg((e) => ({
      ...e,
      crop: { ...crop },
      objects: arrows,
    }));
  };

  const ArrowInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewArrow((e) => ({
      ...e,
      point: { ...e.point, [name]: parseInt(value) },
    }));
  };

  const ArrowTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewArrow((e) => ({
      ...e,
      comment: value,
    }));
  };

  const AddArrowClick = () => {
    AddArrow();
    setRedactedImg((e) => ({
      ...e,
      objects: [...arrows, newArrow],
    }));
  };

  const AddArrow = () => {
    setArrows((e) => [...e, newArrow]);
    setRedactedImg((prevNewArrow) => ({
      ...prevNewArrow,
      objects: arrows,
    }));
  };

  // console.log(crop);
  // console.log(arrows);
  // console.log(newArrow);

  return (
    <div>
      <input name="x" placeholder="фото x" type="text" onChange={InputChange} />
      <input name="y" placeholder="фото y" type="text" onChange={InputChange} />
      <input name="w" placeholder="ширина" type="text" onChange={InputChange} />
      <input name="h" placeholder="высота" type="text" onChange={InputChange} />
      <button onClick={CropClick}>Обрезать</button>

      <input style={{ marginLeft: "20px" }} name="x" placeholder="стрелка x" type="text" onChange={ArrowInputChange} />
      <input name="y" placeholder="стрелка y" type="text" onChange={ArrowInputChange} />
      <input placeholder="текст" type="text" onChange={ArrowTextChange} />
      <button onClick={AddArrowClick}>Добавить</button>

      <ImageComponent {...redactedImg} />
    </div>
  );
};

export default ImageEditor;
