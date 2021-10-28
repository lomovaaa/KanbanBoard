import React from "react";
import "./Section.scss";
import { SectionType } from "../../shared/models/section";
import { TaskType } from "../../shared/models/task";
import { TaskCard } from "../TaskCard/TaskCard";
import { SectionHeader } from "./SectionHeader/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Section: React.FC<{ section: SectionType; key: string }> = (
  props
) => {
  library.add(faPlus);
  let taskElements;
  const section = props.section;
  if (section.tasks.length > 0) {
    taskElements = (
      <div className="cards">
        {section.tasks.map((task: TaskType) => {
          return (
            <TaskCard
              task={task}
              key={task.id}
              accentColor={section.accentColor}
            />
          );
        })}
      </div>
    );
  } else {
    taskElements = <p className="section--empty">Empty section</p>;
  }

  return (
    <div className="section">
      <SectionHeader section={section} />
      <div className="tasks">{taskElements}</div>
      <button className="section__add-task-btn" type="button">
        <FontAwesomeIcon className="icon icon__plus" icon={["fas", "plus"]} />
      </button>
    </div>
  );
};
