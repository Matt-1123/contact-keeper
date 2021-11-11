import React, { useContext, useRef, useEffect } from "react"; // Note: useRef here is used to access the value to a DOM element - the input field.
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef(""); // grabs the user input

  const { filterContacts, clearFilter, filtered } = contactContext;

  // if the filtered part of our state is null, the input's value should be cleared
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
