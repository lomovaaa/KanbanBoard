import React from "react";
import "./index.scss";
import { SectionType } from "../shared/models/section";
import { Board } from "../components/Board/Board";

export const App: React.FC = () => {
  const sections: SectionType[] = [
    {
      alias: "collection-idea",
      title: "Idea",
      accentColor: "#E7AA7E",
      tasks: [
        {
          id: 1,
          title: "Заметка 1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          creationDate: new Date(),
          completed: false,
        },
      ],
    },
    {
      alias: "collection-todo",
      title: "To do",
      accentColor: "#D37171",
      tasks: [
        {
          id: 2,
          title: "Заметка 2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          creationDate: new Date(),
          completed: false,
        },
      ],
    },
    {
      alias: "collection-in-process",
      title: "In process",
      accentColor: "#85C5F3",
      tasks: [],
    },
    {
      alias: "collection-done",
      title: "Done",
      accentColor: "#8ACC48",
      tasks: [],
    },
  ];

  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__title">KanbanBoard</h1>
      </header>
      <main className="main">
        <Board sections={sections} />
      </main>
    </div>
  );
};
