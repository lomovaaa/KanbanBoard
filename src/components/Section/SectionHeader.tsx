import React from "react";
import { ISection } from "../../shared/models/section.interface";
import "./Section.scss";
// import color from 'color';

export const SectionHeader: React.FC<{ section: ISection }> = ({ section }) => {
  const accentColor = section.accentColor;
  const styles = {
    header: {
      backgroundColor: accentColor,
    },
    // counter: {
    //   backgroundColor: accentColor
    //     ? color(accentColor).darken(0.2).rgb().toString()
    //     : "",
    // },
  };

  return (
    <div className="section-header" style={styles.header}>
      <h2 className="section-header__title">{section.title}</h2>
      <div className="section-header__task-counter">
        <span>{section.tasks.length}</span>
      </div>
    </div>
  );
};
