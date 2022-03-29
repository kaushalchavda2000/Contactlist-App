import React from "react";
import styles from "./header.module.css";

const Header = () => {
  return (
    <div>
      <div className={styles.container}>
        <i className={`fa fa-address-book ${styles.icon}`} aria-hidden="true"></i>
        <div className={styles.text_container}>
          <h2 className={styles.heading}>Contacts</h2>
          <h5 className={styles.description}>Welcome to All in one contact page.</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;
