import { useStore } from "effector-react";
import React from "react";
import { ISection } from "../../shared/models/section.interface";
import { $sections } from "../../shared/store";
import { Section } from "../Section/Section";
import "./Board.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Board: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {useStore($sections).map((section: ISection) => {
          return <Section section={section} key={section.alias} />;
        })}
      </div>
    </DndProvider>
  );
};
