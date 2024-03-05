import React, { useState, ChangeEvent } from "react";
import ImageComponent from "./ImageComponent"; // Импорт вашего компонента ImageComponent
import { ImageProps } from "../types";

interface ImageEditorProps {
  props: ImageProps;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ props }) => {
  const [redactedImg, setRedactedImg] = useState({ ...props });
  const [crop, setCrop] = useState({ ...redactedImg.crop });
  const [arrows, setArrows] = useState({ ...redactedImg.objects });

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
    }));
  };

  console.log(crop);
  console.log(arrows);
  console.log(redactedImg);
  return (
    <div>
      <input name="x" placeholder="фото x" type="text" onChange={InputChange} />
      <input name="y" placeholder="фото y" type="text" onChange={InputChange} />
      <input name="w" placeholder="ширина" type="text" onChange={InputChange} />
      <input name="h" placeholder="высота" type="text" onChange={InputChange} />
      <button onClick={CropClick}>Обрезать</button>

      <input placeholder="стрелка x" type="text" />
      <input placeholder="стрелка y" type="text" />
      <input placeholder="текст" type="text" />
      <button>Добавить</button>
      
      <ImageComponent {...redactedImg} />
    </div>
  );
};

export default ImageEditor;
