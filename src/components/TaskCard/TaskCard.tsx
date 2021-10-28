import classNames from "classnames";
import React, { useContext } from "react";
import { TaskType } from "../../shared/models/task";
import "./TaskCard.scss";
import { Context } from "../Board/Board";

export const TaskCard: React.FC<{ task: TaskType; accentColor: string }> = (
  props
) => {
  const styles = {
    date: {
      color: props.accentColor,
    },
  };
  const task = props.task;
  const { markTask } = useContext(Context);

  return (
    <div className={classNames("task", { "task--completed": task.completed })}>
      <h3 className="task__title">{task.title}</h3>
      <span className="task__date" style={styles.date}>
        {task.creationDate.toISOString()}
      </span>
      <p className="task__content">{task.content}</p>
      <button type="button" onClick={() => markTask(task.id)}>
        Mark as completed
      </button>
    </div>
  );
};
