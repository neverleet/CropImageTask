import React, { useState, MouseEvent } from 'react';

const DragAndDropExample: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerWidth = 500;
  const containerHeight = 500;

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newX = event.clientX - dragOffset.x;
    const newY = event.clientY - dragOffset.y;
    setPosition({
      x: Math.min(Math.max(0, newX), containerWidth - 100),
      y: Math.min(Math.max(0, newY), containerHeight - 100),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        backgroundColor: 'lightgrey',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Drag me
      </div>
    </div>
  );
};

export default DragAndDropExample;
