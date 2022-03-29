import React from "react";
import styles from "./searchandadd.module.css";

const SearchAndAdd = ({
  handleModalShowHide,
  editFlagHandler,
  searchQuery,
  setSearchQuery,
}) => {
  const onClickHandler = () => {
    editFlagHandler(false);
    handleModalShowHide();
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchbar_container}>
        <button className={styles.searchicon}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          name="query"
          value={searchQuery}
          id={styles.searchbar}
          size={30}
          placeholder="Search Contacts"
          onChange={(event) => setSearchQuery(event.target.value.trimStart())}
        />
      </div>
      <button className={styles.add} onClick={onClickHandler}>
        + Add Contact
      </button>
    </div>
  );
};

export default SearchAndAdd;
