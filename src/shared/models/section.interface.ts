import { ITask } from './task.interface';

export interface ISection {
  alias: string;
  title: string;
  accentColor: string;
  tasks: ITask[];
}
