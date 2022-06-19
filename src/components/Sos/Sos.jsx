import React from "react";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

import "./Sos.css";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Sos = () => {
  const callback = React.useCallback((e) => {
    // e.preventDefault();

    const MySwal = withReactContent(Swal);

    MySwal.fire({
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      title: <strong>Finding Help</strong>,
      showDenyButton: true,
      confirmButtonText: "911",
      denyButtonText: "Emergency Contacts",
      imageUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        window.location = "tel:911";
      } else if (result.isDenied) {
        // var contactsManager = navigator.contacts;
        // const supported =
        //   "contacts" in navigator && "ContactsManager" in window;
        window.location = "tel:";
      }
    });
  }, []);

  const bind = useLongPress(true ? callback : null, {
    // onStart: (e) => {
    //   e.preventDefault();
    //   // console.log("Press started");
    // },
    onCancel: (e) => {
      e.preventDefault();
      // console.log("Press cancelled");
    },
    onFinish: (e) => {
      e.preventDefault();
      // console.log("Long press finished");
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    threshold: 3000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  return (
    <div className='sos'>
      <button {...bind} className='sos__button' />
    </div>
  );
};

export default Sos;
