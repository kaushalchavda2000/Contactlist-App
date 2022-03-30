import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import SearchAndAdd from "./components/SearchAndAdd/SearchAndAdd";
import ContactList from "./components/ContactList/ContactList";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import Modal from "./components/Modal/Modal";

import "./App.css";

function App() {
  const initialState = {
    contactId: new Date().getTime().toString(),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    address: "",
  };

  const [show, setShow] = useState(false);
  const [contactDetailFlag, setcontactDetailFlag] = useState(false);
  const [contactDetail, setContactDetail] = useState(initialState);
  const [contacts, setContacts] = useState([]);
  const [editFlag, setEditflag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedContacts, setCheckedContacts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleModalShowHide = () => {
    setShow(!show);
  };

  const addDataHandler = (contact) => {
    setContacts((prev) => {
      if (editFlag) {
        const index = contacts.findIndex(
          (obj) => obj.contactId === contact.contactId
        );
        const arr1 = contacts.slice(0, index);
        const arr2 = contacts.slice(index + 1);
        setContactDetail(contact);
        return [...arr1, contact, ...arr2];
      } else {
        return [...prev, contact];
      }
    });
  };

  //storing and retriving data from local storage
  useEffect(() => {
    const retriveData = JSON.parse(localStorage.getItem("contacts"));
    if (retriveData) {
      setContacts(retriveData);
    }
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleContactDetailShowHide = () => {
    setcontactDetailFlag(true);
  };

  const setContactDetailHandler = (id) => {
    const obj = contacts.find((obj) => obj.contactId === id);
    setContactDetail(obj);
  };

  const deleteContactHandler = (contactId, event) => {
    event.stopPropagation();
    if (contactId === contactDetail.contactId) {
      setcontactDetailFlag(false);
    }

    setContacts(() => {
      const newContacts = contacts.filter((obj) => obj.contactId !== contactId);
      return newContacts;
    });
  };

  const CheckedContactsHandler = (contactId, event) => {
    event.stopPropagation();
    setCheckedContacts((prev) =>
      checkedContacts.includes(contactId)
        ? checkedContacts.filter((element) => {
            return element !== contactId;
          })
        : [...prev, contactId]
    );
  };

  const deleteCheckedContactsHandler = () => {
    if (
      contacts.filter((contact) => {
        return contact.contactId === contactDetail.contactId;
      }).length !== 0
    ) {
      setcontactDetailFlag(false);
    }

    const remainingContacts = contacts.filter((contact) => {
      return !checkedContacts.includes(contact);
    });
    setCheckedContacts([]);
    setContacts(remainingContacts);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content_container">
        <Header />
        <SearchAndAdd
          handleModalShowHide={handleModalShowHide}
          editFlagHandler={setEditflag}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="contactdetails_and_list_container">
          <ContactList
            handleContactDetailShowHide={handleContactDetailShowHide}
            contacts={
              searchQuery !== ""
                ? contacts.filter((contact) => {
                    if (
                      `${contact.firstname.toLowerCase()} ${contact.lastname.toLowerCase()}`.includes(
                        searchQuery.toLowerCase()
                      )
                    ) {
                      return true;
                    }
                    return false;
                  })
                : contacts
            }
            setContactDetailHandler={setContactDetailHandler}
            deleteContactHandler={deleteContactHandler}
            CheckedContactsHandler={CheckedContactsHandler}
            checkedContacts={checkedContacts}
            deleteCheckedContactsHandler={deleteCheckedContactsHandler}
            contactDetail={contactDetail}
          >
            {contactDetailFlag && windowWidth < 1250 ? (
              <ContactDetails
                contactDetail={contactDetail}
                handleModalShowHide={handleModalShowHide}
                editFlagHandler={setEditflag}
              />
            ) : null}
          </ContactList>
          {contactDetailFlag && windowWidth >= 1250 && (
            <ContactDetails
              contactDetail={contactDetail}
              handleModalShowHide={handleModalShowHide}
              editFlagHandler={setEditflag}
            />
          )}
        </div>
      </div>
      <Modal
        show={show}
        handleModalShowHide={handleModalShowHide}
        addDataHandler={addDataHandler}
        initialState={editFlag ? contactDetail : initialState}
        btnValue="Edit Contact"
        contacts={
          editFlag
            ? contacts.filter(
                (contact) => contact.contactId !== contactDetail.contactId
              )
            : contacts
        }
      />
    </>
  );
}

export default App;
