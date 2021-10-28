import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Modal } from "../../shared/components/Modal/Modal";
import { Icons, IconTypes } from "../../shared/lib/font-awesome-icon/icons";
import { ISection } from "../../shared/models/section.interface";
import { ITask } from "../../shared/models/task.interface";
import { moveTask } from "../../shared/store";
import { CreateTaskForm } from "../CreateTaskForm/CreateTaskForm";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Section.module.scss";
import { SectionHeader } from "./SectionHeader";

export const Section: React.FC<{ section: ISection }> = ({ section }) => {
  const [isShowModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const [, drop] = useDrop(() => {
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
      <div className={styles.tasks}>
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
      <p className={styles.section_empty}>
        Drag your tasks here or press + to add new tasks
      </p>
    );
  }

  return (
    <div className={styles.section} ref={drop}>
      <SectionHeader section={section} />
      {sectionContent}
      <button
        className={styles["section__add-task-btn"]}
        type="button"
        onClick={() => setModal(true)}
      >
        <FontAwesomeIcon
          className={styles.icon__plus}
          icon={[IconTypes.solid, Icons.faPlus]}
        />
      </button>
      <Modal
        visible={isShowModal}
        onClose={onClose}
        form={<CreateTaskForm sectionAlias={section.alias} onClose={onClose} />}
      />
    </div>
  );
};
