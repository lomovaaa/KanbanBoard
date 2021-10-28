import { TaskType } from "./task";

export type SectionType = {
  alias: string;
  title: string;
  accentColor: string;
  tasks: TaskType[];
};
