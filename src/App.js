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
    color: `#${Math.floor(Math.random() * 16777215).toString(16)} `,
    isChecked: false,
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
  const [searchResults, setSearchResults] = useState([]);
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
      const resetAllContacts = retriveData.map((contact) => {
        contact.isChecked = false;
        return contact;
      });
      setContacts(resetAllContacts);
    }
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

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(JSON.parse(localStorage.getItem("contacts")));
    } else {
      let newContactList = contacts.filter((contact) => {
        if (
          `${contact.firstname.toLowerCase()} ${contact.lastname.toLowerCase()}`.includes(
            searchQuery.toLowerCase()
          )
        ) {
          return true;
        }
        return false;
      });
      setSearchResults(newContactList);
    }
  }, [searchQuery, contacts]);

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

  const CheckedContactsHandler = (contactId) => {
    const contact = contacts.find((obj) => obj.contactId === contactId);
    contact.isChecked = !contact.isChecked;
    const index = contacts.findIndex(
      (obj) => obj.contactId === contact.contactId
    );
    const arr1 = contacts.slice(0, index);
    const arr2 = contacts.slice(index + 1);
    setContacts([...arr1, contact, ...arr2]);
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
      return !contact.isChecked;
    });

    setContacts(remainingContacts);
  };

  window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

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
            contacts={searchQuery !== "" ? searchResults : contacts}
            setContactDetailHandler={setContactDetailHandler}
            deleteContactHandler={deleteContactHandler}
            CheckedContactsHandler={CheckedContactsHandler}
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
