import { SectionAlias } from "./enums/section-alias.enum";
import { createEvent, createStore } from "effector";
import { ISection } from "./models/section.interface";
import { ITask } from "./models/task.interface";
import { v4 as uuidv4 } from "uuid";

const getAllSections = (): ISection[] => {
  if (JSON.parse(localStorage.getItem("sections") as string) === null) {
    const emptySections = [
      {
        alias: SectionAlias.IDEA,
        title: "Idea",
        accentColor: "#E7AA7E",
        tasks: [],
      },
      {
        alias: SectionAlias.TODO,
        title: "To do",
        accentColor: "#D37171",
        tasks: [],
      },
      {
        alias: SectionAlias.IN_PROCESS,
        title: "In process",
        accentColor: "#85C5F3",
        tasks: [],
      },
      {
        alias: SectionAlias.DONE,
        title: "Done",
        accentColor: "#8ACC48",
        tasks: [],
      },
    ];
    updateLocalStorage(emptySections);
  }
  return JSON.parse(localStorage.getItem("sections") as string);
};

const updateLocalStorage = (data: ISection[]) => {
  localStorage.setItem("sections", JSON.stringify(data));
};

export const $sections = createStore<ISection[]>(getAllSections());

export const markTask = createEvent<ITask>();
export const addTask = createEvent<ITask>();
export const removeTask = createEvent<ITask>();
export const moveTask = createEvent<{ task: ITask; targetAlias: string }>();

const markTaskReducer = (state: ISection[], task: ITask) => {
  const getTasks = (section: ISection, task: ITask) => {
    switch (section.alias) {
      case SectionAlias.DONE: {
        return [
          { ...task, completed: true, sectionAlias: SectionAlias.DONE },
          ...section.tasks,
        ];
      }
      case task.sectionAlias: {
        return section.tasks.filter((t) => t.id !== task.id);
      }
      default: {
        return [...section.tasks];
      }
    }
  };
  const newState = state.map((section) => ({
    ...section,
    tasks: getTasks(section, task),
  }));
  updateLocalStorage(newState);
  return newState;
};
$sections.on(markTask, markTaskReducer);

const addTaskReducer = (state: ISection[], task: ITask) => {
  const newState = state.map((section) => ({
    ...section,
    tasks:
      section.alias === task.sectionAlias
        ? [...section.tasks, { ...task, id: uuidv4() }]
        : section.tasks,
  }));
  updateLocalStorage(newState);
  return newState;
};
$sections.on(addTask, addTaskReducer);

const removeTaskReducer = (state: ISection[], task: ITask) => {
  const newState = state.map((section) => ({
    ...section,
    tasks:
      section.alias === task.sectionAlias
        ? section.tasks.filter((t) => t.id !== task.id)
        : section.tasks,
  }));
  updateLocalStorage(newState);
  return newState;
};
$sections.on(removeTask, removeTaskReducer);

const moveTaskReducer = (
  state: ISection[],
  {
    task,
    targetAlias,
  }: {
    task: ITask;
    targetAlias: string;
  }
) => {
  if (task.sectionAlias !== SectionAlias.DONE) {
    removeTask(task);
    addTask({
      ...task,
      sectionAlias: targetAlias,
      completed:
        targetAlias === SectionAlias.DONE ? !task.completed : task.completed,
    });
  }
  return $sections.getState();
};
$sections.on(moveTask, moveTaskReducer);
