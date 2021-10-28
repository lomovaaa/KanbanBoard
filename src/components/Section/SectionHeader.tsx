import color from 'color';
import React from 'react';
import { ISection } from '../../shared/models/section.interface';
import styles from './Section.module.scss';

export const SectionHeader: React.FC<{ section: ISection }> = ({ section }) => {
  const accentColor = section.accentColor;
  const customStyles = {
    header: {
      backgroundColor: accentColor,
    },
    counter: {
      backgroundColor: color(accentColor).darken(0.2).rgb().toString(),
    },
  };

  return (
    <div className={styles['section-header']} style={customStyles.header}>
      <h2 className={styles['section-header__title']}>{section.title}</h2>
      <div className={styles['section-header__task-counter']} style={customStyles.counter}>
        <span>{section.tasks.length}</span>
      </div>
    </div>
  );
};
