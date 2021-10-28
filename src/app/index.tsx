import React from 'react';
import { Board } from '../components/Board/Board';
import './index.scss';

export const App: React.FC = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="header__title">KanbanBoard</h1>
      </header>
      <main className="main">
        <Board />
      </main>
    </div>
  );
};
