import React, { useEffect, useState } from "react";

import Input from "../Input/Input";

import styles from "./modal.module.css";

const errorMessagesInitialState = {
  firstname_error: "",
  lastname_error: "",
  email_error: "",
  phone_error: "",
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
    handleValidation(event.target.name, event.target.value);
  };

  const handleValidation = (name, value) => {

    let bool, message;

    const getError = () => {
      switch (name) {
        case "firstname":
          message = value.trim() !== "" ? "" : "First Name is required!";
          bool = value.trim() !== "";
          return message;
        case "lastname":
          message = value.trim() !== "" ? "" : "Last Name is required!";
          bool = value.trim() !== "";
          return message;
        case "email":
          const email =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
          const emailsAlreadyExist = contacts.find(
            (obj) => obj.email === value
          );
          message = email
            ? emailsAlreadyExist
              ? "This Email is already Exists!"
              : ""
            : "Invalid Email Address!";
          bool = email ? (emailsAlreadyExist ? false : true) : false;
          return message;
        case "phone":
          const phoneNo = /^\d{10}$/.test(value);
          const phoneNoAlreadyExist = contacts.find(
            (obj) => obj.phone === value
          );
          message = phoneNo
          ? phoneNoAlreadyExist
            ? "This Phone number is already Exists!"
            : ""
          : "Invalid Phone Number!";
          bool = phoneNo ? (phoneNoAlreadyExist ? false : true) : false;
          return message;
        case "company":
          message = value.trim() !== "" ? "" : "Company is required!";
          bool = value.trim() !== "";
          return message;
        case "role":
          message = value.trim() !== "" ? "" : "Role is required!";
          bool = value.trim() !== "";
          return message;
        case "address":
          message = value.trim() !== "" ? "" : "Address is required!";
          bool = value.trim() !== "";
          return message;
        default:
          alert("Something went wrong Please try again!");
          return "";
      }
    };

    setErrorMessages((prev) => {
      return {
        ...prev,
        [`${name}_error`]: getError(),
      };
    });
    return bool;
  };

 

  const addContactHandler = (event) => {
    event.preventDefault();
    const arr = [];
    Array.from(Object.keys(contact).slice(2)).forEach((key) => {
      arr.push(handleValidation(key, contact[key]));
    });
    if (!arr.includes(false)) {
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
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2 className={styles.title}>Enter Contact Details</h2>
          <button className={styles.cancel_btn} onClick={handleModalShowHide}>
            X
          </button>
        </div>
        <div className={styles.modal_body}>
          <Input
            label={"First Name"}
            name={"firstname"}
            placeholder={"Enter First Name"}
            value={contact.firstname}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.firstname_error}
          />
          <Input
            label={"Last Name"}
            name={"lastname"}
            placeholder={"Enter Last Name"}
            value={contact.lastname}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.lastname_error}
          />
          <Input
            label={"Email"}
            name={"email"}
            placeholder={"Enter Your Email Address"}
            value={contact.email}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.email_error}
          />
          <Input
            label={"Phone No."}
            name={"phone"}
            placeholder={"Enter Your Phone Number"}
            value={contact.phone}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.phone_error}
          />
          <Input
            label={"Company"}
            name={"company"}
            placeholder={"Enter Company Name"}
            value={contact.company}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.company_error}
          />
          <Input
            label={"Your Role"}
            name={"role"}
            placeholder={"Enter Your Role"}
            value={contact.role}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.role_error}
          />
          <Input
            label={"Address"}
            name={"address"}
            placeholder={"Enter Your Address"}
            value={contact.address}
            onChangeHandler={onChangeHandler}
            handleValidation={(event) =>
              handleValidation(event.target.name, event.target.value)
            }
            errorMessage={errormessages.address_error}
          />
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
