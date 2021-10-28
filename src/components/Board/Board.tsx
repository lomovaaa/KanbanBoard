import { useStore } from 'effector-react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { $sections } from '../../shared/store';
import { Section } from '../Section/Section';
import styles from './Board.module.scss';

export const Board: React.FC = () => {
  const sections = useStore($sections);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.board}>
        {sections.map((section) => {
          return <Section section={section} key={section.alias} />;
        })}
      </div>
    </DndProvider>
  );
};
