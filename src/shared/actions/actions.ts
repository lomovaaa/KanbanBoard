import { v4 as uuidv4 } from "uuid";
import { ISection } from "../models/section.interface";
import { ITask } from "../models/task.interface";
import { updateLocalStorage } from "../store";

export const addTaskAction = (section: ISection, task: ITask) => {
  const newSection = {
    ...section,
    tasks: [...section.tasks, { ...task, id: uuidv4() }],
  };
  updateLocalStorage(section.alias, newSection.tasks);
  return newSection;
};

export const removeTaskAction = (section: ISection, task: ITask) => {
  const newSection = {
    ...section,
    tasks: section.tasks.filter((t) => t.id !== task.id),
  };
  updateLocalStorage(section.alias, newSection.tasks);
  return newSection;
};
