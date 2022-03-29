import React from "react";

import styles from "./contactdetails.module.css";

const ContactDetails = ({
  contactDetail,
  handleModalShowHide,
  editFlagHandler,
}) => {
  const onClickHandler = () => {
    editFlagHandler(true);
    handleModalShowHide();
  };

  return (
    <div className={styles.container}>
      <div className={styles.upperbox}>
        <div
          id={styles.icon}
          style={{
            backgroundColor: `${
              contactDetail.color === "#ffffff" ? "black" : contactDetail.color
            }`,
          }}
        >{`${contactDetail.firstname
          .charAt(0)
          .toUpperCase()}${contactDetail.lastname
          .charAt(0)
          .toUpperCase()}`}</div>
        <h2 className={styles.fullname}>{`${contactDetail.firstname
          .charAt(0)
          .toUpperCase()
          .concat(
            contactDetail.firstname.slice(1).toLowerCase()
          )} ${contactDetail.lastname
          .charAt(0)
          .toUpperCase()
          .concat(contactDetail.lastname.slice(1).toLowerCase())}`}</h2>
        <p className={styles.position_container}>{`${contactDetail.role} @ ${contactDetail.company}`}</p>
      </div>
      <div className={styles.lowerbox}>
        <div className={styles.singledetailcontainer}>
          <span className={styles.property}>Full Name</span>
          <span className={styles.value}>{`${contactDetail.firstname
            .charAt(0)
            .toUpperCase()
            .concat(
              contactDetail.firstname.slice(1).toLowerCase()
            )} ${contactDetail.lastname
            .charAt(0)
            .toUpperCase()
            .concat(contactDetail.lastname.slice(1).toLowerCase())}`}</span>
        </div>
        <div className={styles.singledetailcontainer}>
          <span className={styles.property}>Email</span>
          <span className={styles.value}>{contactDetail.email}</span>
        </div>
        <div className={styles.singledetailcontainer}>
          <span className={styles.property}>Phone</span>
          <span className={styles.value}>{contactDetail.phone}</span>
        </div>
        <div className={styles.singledetailcontainer}>
          <span className={styles.property}>Company</span>
          <span className={styles.value}>{contactDetail.company}</span>
        </div>
        <div className={styles.singledetailcontainer}>
          <span className={styles.property}>Address</span>
          <span className={styles.value}>{contactDetail.address}</span>
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn} onClick={onClickHandler}>
            Edit Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
