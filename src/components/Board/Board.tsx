import React, { useState } from "react";
import "./Board.scss";
import { Section } from "../Section/Section";
import { SectionType } from "../../shared/models/section";
import { TaskType } from "../../shared/models/task";
import { SectionAlias } from "../../shared/enums/section-alias.enum";

export const Context = React.createContext<{
  markTask: (taskId: number) => void;
}>({
  markTask: () => {},
});

export const Board: React.FC<{ sections: SectionType[] }> = ({ sections }) => {
  const [currSections, setSections] = useState(sections);

  const markTask = (taskId: number) => {
    let completedTask: TaskType;
    const updatedSections = currSections.map((section) => {
      section.tasks = section.tasks.filter((task) => {
        if (task.id === taskId) {
          task.completed = !task.completed;
          completedTask = task;
        }
        return task.id !== taskId;
      });
      if (section.alias === SectionAlias.DONE) {
        section.tasks.unshift(completedTask);
      }
      return section;
    });
    setSections(updatedSections);
  };

  return (
    <Context.Provider value={{ markTask }}>
      <div className="board">
        {currSections.map((section: SectionType) => {
          return <Section section={section} key={section.alias} />;
        })}
      </div>
    </Context.Provider>
  );
};
