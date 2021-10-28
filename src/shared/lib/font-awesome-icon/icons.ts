import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export enum IconTypes {
  solid = "fas",
  regular = "far",
}

export enum Icons {
  faPlus = "plus",
  faCheckCircle = "check-circle",
  faTrashAlt = "trash-alt",
  faTimes = "times",
}

library.add(faPlus, faCheckCircle, faTrashAlt, faTimes);
