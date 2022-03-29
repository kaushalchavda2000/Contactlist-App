import React from "react";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <i className={`fa fa-bars ${styles.icon}`} aria-hidden="true" style={{marginBottom:"60px"}}></i>
      <i className={`fa fa-home ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-user ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-file-text ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-clock ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-database ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-calendar ${styles.icon}`} aria-hidden="true"></i>
      <i className={`fa fa-cog ${styles.icon}`} aria-hidden="true"></i>
    </div>
  );
};

export default Sidebar;
