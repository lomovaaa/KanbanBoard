import React from "react";
import { SectionType } from "../../../shared/models/section";
import "./SectionHeader.scss";
// import color from "color";

export const SectionHeader: React.FC<{ section: SectionType }> = ({
  section,
}) => {
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
      <h2 className="section__title">{section.title}</h2>
      <div className="section__task-counter">
        <span>{section.tasks.length}</span>
      </div>
    </div>
  );
};
