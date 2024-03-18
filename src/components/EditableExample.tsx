import React, { useState, ChangeEvent } from "react";

const EditableExample: React.FC = () => {
  const [content, setContent] = useState<string>("Редактируемое содержимое");

  const handleContentChange = (event: ChangeEvent<HTMLDivElement>) => {
    setContent(event.target.innerText);
  };
  const DataGet = () => {
    console.log(content);
  };
  return (
    <div>
      <div
        onChange={DataGet}
        contentEditable
        onBlur={handleContentChange}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <button onClick={DataGet}>Вывести</button>
    </div>
  );
};

export default EditableExample;
