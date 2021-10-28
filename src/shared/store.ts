import { combine, createEvent, createStore, split } from "effector";
import { actions } from "./actions";
import { SectionAlias } from "./enums/section-alias.enum";
import { ISection } from "./models/section.interface";
import { ITask } from "./models/task.interface";

const sectionDescription: ISection[] = [
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

const getSectionData = (alias: SectionAlias) => {
  const section = sectionDescription.filter((d) => d.alias === alias)[0];
  if (JSON.parse(localStorage.getItem(alias) as string) === null) {
    updateLocalStorage(alias, []);
  }
  section.tasks = JSON.parse(localStorage.getItem(alias) as string);
  return section;
};

export const updateLocalStorage = (alias: SectionAlias, data: ITask[]) => {
  localStorage.setItem(alias, JSON.stringify(data));
};

export const $idea = createStore<ISection>(getSectionData(SectionAlias.IDEA));
export const $toDo = createStore<ISection>(getSectionData(SectionAlias.TODO));
export const $inProcess = createStore<ISection>(
  getSectionData(SectionAlias.IN_PROCESS)
);
export const $done = createStore<ISection>(getSectionData(SectionAlias.DONE));

export const $sections = combine([$idea, $toDo, $inProcess, $done]);

export const addTask = createEvent<ITask>();
export const removeTask = createEvent<ITask>();
export const moveTask = createEvent<{ task: ITask; targetAlias: string }>();

const addIdea = createEvent<ITask>();
const addTodo = createEvent<ITask>();
const addInProcess = createEvent<ITask>();
const addDone = createEvent<ITask>();

const removeIdea = createEvent<ITask>();
const removeTodo = createEvent<ITask>();
const removeInProcess = createEvent<ITask>();
const removeDone = createEvent<ITask>();

split({
  source: addTask,
  match: {
    idea: (task) => task.sectionAlias === SectionAlias.IDEA,
    todo: (task) => task.sectionAlias === SectionAlias.TODO,
    inProcess: (task) => task.sectionAlias === SectionAlias.IN_PROCESS,
    done: (task) => task.sectionAlias === SectionAlias.DONE,
  },
  cases: {
    idea: addIdea,
    todo: addTodo,
    inProcess: addInProcess,
    done: addDone,
  },
});

split({
  source: removeTask,
  match: {
    idea: (task) => task.sectionAlias === SectionAlias.IDEA,
    todo: (task) => task.sectionAlias === SectionAlias.TODO,
    inProcess: (task) => task.sectionAlias === SectionAlias.IN_PROCESS,
    done: (task) => task.sectionAlias === SectionAlias.DONE,
  },
  cases: {
    idea: removeIdea,
    todo: removeTodo,
    inProcess: removeInProcess,
    done: removeDone,
  },
});

$idea
  .on(addIdea, (state: ISection, task: ITask) =>
    actions.addTaskAction(state, task)
  )
  .on(removeIdea, (state: ISection, task: ITask) =>
    actions.removeTaskAction(state, task)
  );

$toDo
  .on(addTodo, (state: ISection, task: ITask) =>
    actions.addTaskAction(state, task)
  )
  .on(removeTodo, (state: ISection, task: ITask) =>
    actions.removeTaskAction(state, task)
  );

$inProcess
  .on(addInProcess, (state: ISection, task: ITask) =>
    actions.addTaskAction(state, task)
  )
  .on(removeInProcess, (state: ISection, task: ITask) =>
    actions.removeTaskAction(state, task)
  );

$done
  .on(addDone, (state: ISection, task: ITask) =>
    actions.addTaskAction(state, task)
  )
  .on(removeDone, (state: ISection, task: ITask) =>
    actions.removeTaskAction(state, task)
  );
