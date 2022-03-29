import React from "react";
import styles from "./contactlist.module.css";

const ContactList = ({
  handleContactDetailShowHide,
  contacts,
  setContactDetailHandler,
  deleteContactHandler,
  CheckedContactsHandler,
  deleteCheckedContactsHandler,
  contactDetail,
  children,
}) => {
  const showContact = (id) => {
    handleContactDetailShowHide(true);
    setContactDetailHandler(id);
  };

  return (
    <div className={styles.container}>
      <li className={styles.title}>
        <button id={styles.deletesymbol} onClick={deleteCheckedContactsHandler}>
          {contacts.filter((contact) => {
            return contact.isChecked;
          }).length !== 0 && <i className="fa-solid fa-trash-can"></i>}
        </button>
        <div id={styles.titleinfo}>Basic info</div>
        <div id={styles.titlecompany}>Company</div>
      </li>

      {contacts.length !== 0 ? (
        contacts.map((contact) => {
          return (
            <div className={styles.contact_container} key={contact.contactId}>
              <li
                className={styles.contact}
                onClick={() => showContact(contact.contactId)}
              >
                <input
                  type="checkbox"
                  name="checkboxValue"
                  className={styles.check}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) =>
                    CheckedContactsHandler(contact.contactId)
                  }
                  checked={contact.isChecked}
                />
                <div className={styles.wrapper}>
                  <div className={styles.info}>
                    <div
                      className={styles.icon}
                      style={{
                        backgroundColor: `${
                          contact.color === "#ffffff" ? "black" : contact.color
                        }`,
                      }}
                    >{`${contact.firstname
                      .charAt(0)
                      .toUpperCase()}${contact.lastname
                      .charAt(0)
                      .toUpperCase()}`}</div>
                    <div className={styles.text}>
                      <h3
                        className={`${styles.name} ${styles.text_overflow_hidden}`}
                      >{`${contact.firstname
                        .charAt(0)
                        .toUpperCase()
                        .concat(
                          contact.firstname.slice(1).toLowerCase()
                        )} ${contact.lastname
                        .charAt(0)
                        .toUpperCase()
                        .concat(contact.lastname.slice(1).toLowerCase())}`}</h3>
                      <div
                        className={`${styles.email} ${styles.text_overflow_hidden}`}
                      >{`${contact.email}`}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.company} ${styles.text_overflow_hidden}`}
                >
                  {contact.company}
                </div>
                <button
                  className={styles.delete_btn}
                  onClick={(event) =>
                    deleteContactHandler(contact.contactId, event)
                  }
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
              {contact.contactId === contactDetail.contactId && children}
            </div>
          );
        })
      ) : (
        <div className={styles.error_msg_container}>
          <h1 className="error_msg">Oops! Sorry No Contacts Found!</h1>
        </div>
      )}
    </div>
  );
};

export default ContactList;
