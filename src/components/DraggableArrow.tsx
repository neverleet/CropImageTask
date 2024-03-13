import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { ImageObject } from "../types";

interface DraggableArrowProps {
  arrow: ImageObject;
  onDrag: (id: string, x: number, y: number) => void;
}

const DraggableArrow: React.FC<DraggableArrowProps> = ({ arrow, onDrag }) => {
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const offsetX = useRef<number>(0);
  const offsetY = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && arrowRef.current) {
        const x = e.clientX - offsetX.current;
        const y = e.clientY - offsetY.current;

        onDrag(arrow.comment, x, y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove as any);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove as any);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [arrow, isDragging, onDrag]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (arrowRef.current) {
      setIsDragging(true);
      offsetX.current = e.clientX - arrowRef.current.getBoundingClientRect().left;
      offsetY.current = e.clientY - arrowRef.current.getBoundingClientRect().top;
    }
  };

  return (
    <div
      ref={arrowRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: `${arrow.point.x}%`,
        top: `${arrow.point.y}%`,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : 1,
        userSelect: "none",
      }}
    >
      {arrow.comment && <div style={{ marginTop: "5px", color: "red", fontWeight: "bold" }}>{arrow.comment}</div>}
      <div style={{ fontSize: "24px", color: "red", marginTop: "15px", transform: "rotate(45deg)" }}>⇒</div>
    </div>
  );
};

export default DraggableArrow;
