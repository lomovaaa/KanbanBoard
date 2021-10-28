import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Modal } from "../../shared/components/Modal/Modal";
import { ISection } from "../../shared/models/section.interface";
import { ITask } from "../../shared/models/task.interface";
import { moveTask } from "../../shared/store";
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";
import { TaskCard } from "../TaskCard/TaskCard";
import "./Section.scss";
import { SectionHeader } from "./SectionHeader";

library.add(faPlus);

export const Section: React.FC<{ section: ISection }> = ({ section }) => {
  const [isShowModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const [{}, drop] = useDrop(() => {
    return {
      accept: "task",
      drop: (item: ITask) =>
        moveTask({ task: item, targetAlias: section.alias }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    };
  });

  let sectionContent: JSX.Element;
  if (section.tasks.length > 0) {
    sectionContent = (
      <div className="tasks">
        {section.tasks.map((task: ITask) => {
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
    sectionContent = (
      <p className="section--empty">
        Drag your tasks here or press + to add new tasks
      </p>
    );
  }

  return (
    <div className="section" ref={drop}>
      <SectionHeader section={section} />
      {sectionContent}
      <button
        className="section__add-task-btn"
        type="button"
        onClick={() => setModal(true)}
      >
        <FontAwesomeIcon className="icon icon__plus" icon={["fas", "plus"]} />
      </button>
      <Modal
        visible={isShowModal}
        onClose={onClose}
        form={<CreateTaskForm sectionAlias={section.alias} onClose={onClose} />}
      />
    </div>
  );
};
