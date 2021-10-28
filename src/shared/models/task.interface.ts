import { SectionAlias } from "./../enums/section-alias.enum";
export interface ITask {
  sectionAlias: SectionAlias;
  id: string;
  title: string;
  content: string;
  creationDate: Date;
  completed: boolean;
}
