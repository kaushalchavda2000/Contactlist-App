import React, { useEffect, useState } from "react";

import styles from "./modal.module.css";

const errorMessagesInitialState = {
  firstname_error: "",
  lastname_error: "",
  email_error: "",
  phoneNo_error: "",
  company_error: "",
  role_error: "",
  address_error: "",
};

const Modal = ({
  show,
  handleModalShowHide,
  addDataHandler,
  initialState,
  btnValue,
  contacts,
}) => {
  
  

  const [contact, setContact] = useState(initialState);
  const [errormessages, setErrorMessages] = useState(errorMessagesInitialState);

  useEffect(() => {
    setErrorMessages(errorMessagesInitialState);
  }, [show]);

  useEffect(() => {
    setContact(initialState);
  }, [initialState]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setContact((previous) => ({
      ...previous,
      [name]: value,
    }));
    handleValidation(event);
  };

  const handleValidation = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstname":
        validateFirstName(value);
        break;
      case "lastname":
        validateLastName(value);
        break;
      case "phone":
        validatePhoneNumber(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "company":
        validateCompany(value);
        break;
      case "role":
        validateRole(value);
        break;
      case "address":
        validateAddress(value);
        break;
      default:
        alert("Something went wrong Please try again!");
        break;
    }
  };

  const validateFirstName = (name) => {
    if (name.trim() !== "") {
      setErrorMessages((previous) => ({
        ...previous,
        firstname_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        firstname_error: "First Name is required!",
      }));
      return false;
    }
  };

  const validateLastName = (name) => {
    if (name.trim() !== "") {
      setErrorMessages((previous) => ({
        ...previous,
        lastname_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        lastname_error: "Last Name is required!",
      }));
      return false;
    }
  };

  const validateEmail = (email) => {
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      const emailsAlreadyExist = contacts.find((obj) => obj.email === email);
      if (emailsAlreadyExist) {
        setErrorMessages((previous) => ({
          ...previous,
          email_error: "This Email is already Exists!",
        }));
        return false;
      }
      setErrorMessages((previous) => ({
        ...previous,
        email_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        email_error: "Invalid Email Address!",
      }));
      return false;
    }
  };

  const validatePhoneNumber = (number) => {
    var phoneno = /^\d{10}$/;
    if (number.match(phoneno)) {
      const phoneNoAlreadyExist = contacts.find((obj) => obj.phone === number);
      if (phoneNoAlreadyExist) {
        setErrorMessages((previous) => ({
          ...previous,
          phoneNo_error: "This Phone number is already Exists!",
        }));
        return false;
      }
      setErrorMessages((previous) => ({
        ...previous,
        phoneNo_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        phoneNo_error: "Invalid Phone Number!",
      }));
      return false;
    }
  };

  const validateCompany = (company) => {
    if (company.trim() !== "") {
      setErrorMessages((previous) => ({
        ...previous,
        company_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        company_error: "Company is Required!",
      }));
      return false;
    }
  };

  const validateRole = (role) => {
    if (role.trim() !== "") {
      setErrorMessages((previous) => ({
        ...previous,
        role_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        role_error: "Role is Required!",
      }));
      return false;
    }
  };

  const validateAddress = (address) => {
    if (address.trim() !== "") {
      setErrorMessages((previous) => ({
        ...previous,
        address_error: "",
      }));
      return true;
    } else {
      setErrorMessages((previous) => ({
        ...previous,
        address_error: "Address is Required!",
      }));
      return false;
    }
  };

  const addContactHandler = (event) => {
    event.preventDefault();
    const firstname = validateFirstName(contact.firstname);
    const lastname = validateLastName(contact.lastname);
    const email = validateEmail(contact.email);
    const phone = validatePhoneNumber(contact.phone);
    const company = validateCompany(contact.company);
    const role = validateRole(contact.role);
    const address = validateAddress(contact.address);
    if (firstname && lastname && email && phone && company && role && address) {
      setContact(initialState);
      addDataHandler(contact);
      handleModalShowHide();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <form className={styles.modal}>
      {/*oncClick = {modalShowHideHandler}*/}
      <div className={styles.modal_content}>
        {/*onClick={(e) => e.stopPropagation()} */}
        <div className={styles.modal_header}>
          <h2 className={styles.title}>Enter Contact Details</h2>
          <button className={styles.cancel_btn} onClick={handleModalShowHide}>
            X
          </button>
        </div>
        <div className={styles.modal_body}>
          <div className={`${styles.name}`}>
            <div className={`${styles.firstname_container} ${styles.flex}`}>
              <label htmlFor={styles.firstname}>First Name</label>
              <input
                type="text"
                placeholder="Enter First name"
                name="firstname"
                id={styles.firstname}
                value={contact.firstname}
                onChange={onChangeHandler}
                onBlur={handleValidation}
              />
              {errormessages.firstname_error && (
                <div className={styles.errormessage}>
                  {errormessages.firstname_error}
                </div>
              )}
            </div>
            <div className={`${styles.lastname_container} ${styles.flex}`}>
              <label htmlFor={styles.lastname}>Last Name</label>
              <input
                type="text"
                placeholder="Enter Last name"
                name="lastname"
                id={styles.lastname}
                value={contact.lastname}
                onChange={onChangeHandler}
                onBlur={handleValidation}
              />
              {errormessages.lastname_error && (
                <div className={styles.errormessage}>
                  {errormessages.lastname_error}
                </div>
              )}
            </div>
          </div>
          <div className={`${styles.email_container} ${styles.flex}`}>
            <label htmlFor={styles.email}>Email</label>
            <input
              type="text"
              placeholder="Enter your Email Address"
              name="email"
              id={styles.email}
              value={contact.email}
              onChange={onChangeHandler}
              onBlur={handleValidation}
            />
            {errormessages.email_error && (
              <div className={styles.errormessage}>
                {errormessages.email_error}
              </div>
            )}
          </div>
          <div className={`${styles.phone_container} ${styles.flex}`}>
            <label htmlFor={styles.phone}>Phone NO.</label>
            <input
              type="text"
              placeholder="Enter Your Phone number"
              name="phone"
              id={styles.phone}
              value={contact.phone}
              onChange={onChangeHandler}
              onBlur={handleValidation}
            />
            {errormessages.phoneNo_error && (
              <div className={styles.errormessage}>
                {errormessages.phoneNo_error}
              </div>
            )}
          </div>
          <div className={`${styles.company_container} ${styles.flex}`}>
            <label htmlFor={styles.company}>Company</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              name="company"
              id={styles.company}
              value={contact.company}
              onChange={onChangeHandler}
              onBlur={handleValidation}
            />
            {errormessages.company_error && (
              <div className={styles.errormessage}>
                {errormessages.company_error}
              </div>
            )}
          </div>
          <div className={`${styles.role_container} ${styles.flex}`}>
            <label htmlFor={styles.role}>Your Role </label>
            <input
              type="text"
              placeholder="Enter your role"
              name="role"
              id={styles.role}
              value={contact.role}
              onChange={onChangeHandler}
              onBlur={handleValidation}
            />
            {errormessages.role_error && (
              <div className={styles.errormessage}>
                {errormessages.role_error}
              </div>
            )}
          </div>
          <div className={`${styles.address_container} ${styles.flex}`}>
            <label htmlFor={styles.address}>Address</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              name="address"
              id={styles.address}
              value={contact.address}
              onChange={onChangeHandler}
              onBlur={handleValidation}
            />
            {errormessages.address_error && (
              <div className={styles.errormessage}>
                {errormessages.address_error}
              </div>
            )}
          </div>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.add_btn} onClick={addContactHandler}>
            {btnValue}
          </button>
          
        </div>
      </div>
    </form>
  );
};

export default Modal;
