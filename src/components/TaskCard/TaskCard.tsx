import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { useDrag } from "react-dnd";
import { SectionAlias } from "../../shared/enums/section-alias.enum";
import { Icons, IconTypes } from "../../shared/lib/font-awesome-icon/icons";
import { ITask } from "../../shared/models/task.interface";
import { removeTask } from "../../shared/store";
import styles from "./TaskCard.module.scss";

export const TaskCard: React.FC<{ task: ITask; accentColor: string }> = ({
  task,
  accentColor,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx(styles.task, { [styles._completed]: task.completed })}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <h3 className={styles.task__title}>{task.title}</h3>
      <span className={styles.task__date} style={{ color: accentColor }}>
        {new Date(task.creationDate).toLocaleDateString()}
      </span>
      <p className={styles.task__content}>{task.content}</p>
      <div className={styles.task__actions}>
        {task.sectionAlias !== SectionAlias.DONE && (
          <button
            className={styles.action}
            type="button"
            // onClick={() => markTask(task)}
          >
            <FontAwesomeIcon
              className={styles.action__icon_mark}
              icon={[IconTypes.regular, Icons.faCheckCircle]}
            />
          </button>
        )}
        <button
          className={styles.action}
          type="button"
          onClick={() => removeTask(task)}
        >
          <FontAwesomeIcon
            className={styles.action__icon_remove}
            icon={[IconTypes.regular, Icons.faTrashAlt]}
          />
        </button>
      </div>
    </div>
  );
};
