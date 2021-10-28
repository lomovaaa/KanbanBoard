import { SectionAlias } from './../enums/section-alias.enum';
import { ITask } from './task.interface';

export interface ISection {
  alias: SectionAlias;
  title: string;
  accentColor: string;
  tasks: ITask[];
}
