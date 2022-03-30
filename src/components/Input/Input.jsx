import React from "react";

import styles from "./input.module.css";

const Input = ({label, name, placeholder,value, onChangeHandler, handleValidation, errorMessage}) => {

  return (
    <div className={styles.flex}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        className={styles.inputfield}
        id={name}
        value={value}
        onChange={onChangeHandler}
        onBlur={handleValidation}
      />    
      {errorMessage && (
        <div className={styles.errormessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
