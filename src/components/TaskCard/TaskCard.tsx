import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { useDrag } from "react-dnd";
import { SectionAlias } from "../../shared/enums/section-alias.enum";
import { ITask } from "../../shared/models/task.interface";
import { markTask, removeTask } from "../../shared/store";
import "./TaskCard.scss";

library.add(faCheckCircle, faTrashAlt);

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
      className={classNames("task", { "task--completed": task.completed })}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <h3 className="task__title">{task.title}</h3>
      <span className="task__date" style={{ color: accentColor }}>
        {new Date(task.creationDate).toLocaleDateString()}
      </span>
      <p className="task__content">{task.content}</p>
      <div className="task__actions">
        {task.sectionAlias !== SectionAlias.DONE && (
          <button
            className="action"
            type="button"
            onClick={() => markTask(task)}
          >
            <FontAwesomeIcon
              className="action__icon--mark"
              icon={["far", "check-circle"]}
            />
          </button>
        )}
        <button
          className="action"
          type="button"
          onClick={() => removeTask(task)}
        >
          <FontAwesomeIcon
            className="action__icon--remove"
            icon={["far", "trash-alt"]}
          />
        </button>
      </div>
    </div>
  );
};
