import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal",
      },
      {
        id: 2,
        name: "Bill Bohnson",
        email: "bill@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "Thrill Throhnson",
        email: "thrill@gmail.com",
        phone: "333-333-3333",
        type: "professional",
      },
    ],
  };

  // Pull out state and dispatch from reducer using the useReducer hook
  // state: allows us to access anything in our state. We get this from useReducer.
  // dispatch: allows us to dispatch objects to the reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ACTIONS:
  // Add contact

  // Delete contact

  // Set current contact

  // Clear current contact

  // Update contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
