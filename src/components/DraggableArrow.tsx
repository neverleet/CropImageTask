import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { ImageObject } from "../types";

interface DraggableArrowProps {
  arrow: ImageObject;
  onDrag: (id: string, x: number, y: number) => void;
}

const DraggableArrow: React.FC<DraggableArrowProps> = ({ arrow, onDrag }) => {
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(arrow.comment || "");

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
    if (arrowRef.current && arrowRef.current.parentElement) {
      setIsDragging(true);
      const imageRect = arrowRef.current.parentElement.getBoundingClientRect();
      offsetX.current = e.clientX - arrowRef.current.getBoundingClientRect().left + imageRect.left;
      offsetY.current = e.clientY - arrowRef.current.getBoundingClientRect().top + imageRect.top;
    }
  };

  const handleCommentDoubleClick = () => {
    setIsEditing(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentBlur = () => {
    setIsEditing(false);
    arrow.comment = comment;
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
      {isEditing ? (
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
          onBlur={handleCommentBlur}
          autoFocus
          style={{ width: "100%", marginTop: "5px", color: "red", fontWeight: "bold" }}
        />
      ) : (
        <>
          {arrow.comment && (
            <div
              onDoubleClick={handleCommentDoubleClick}
              style={{ marginTop: "5px", color: "red", fontWeight: "bold" }}
            >
              {arrow.comment}
            </div>
          )}
          <div style={{ fontSize: "24px", width: "20px", color: "red", marginTop: "15px", transform: "rotate(45deg)" }}>
            ⇒
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableArrow;
