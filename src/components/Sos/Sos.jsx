import React, { useState } from "react";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import gif from "./../../assets/pulse-animation.gif";
import "./Sos.css";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";

const Sos = () => {
  const [helperDetails, setHelperDetails] = useState();
  let needHelpLat, needHelpLong;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
    try {
      const { data } = await axios({
        method: "post",
        url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/end_sos/${localStorage.getItem(
          "uid"
        )}`,
        data: "",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  window.navigator.geolocation.getCurrentPosition(function (position) {
    needHelpLat = position.coords.latitude;
    needHelpLong = position.coords.longitude;
  });

  const callback = React.useCallback(
    (e) => {
      // e.preventDefault();
      const MySwal = withReactContent(Swal);

      const helpNeeded = async () => {
        try {
          const { data } = await axios({
            method: "post",
            url: `http://ec2-3-92-183-0.compute-1.amazonaws.com/sos/start/${localStorage.getItem(
              "uid"
            )},${needHelpLat},${needHelpLong}`,
            data: "",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              accept: "application/json",
            },
          });
          setHelperDetails(data);
          MySwal.close();
          handleOpen();
        } catch (error) {
          console.log(error);
        }
      };

      MySwal.fire({
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showDenyButton: true,
        confirmButtonText: "911",
        denyButtonText: "Emergency Contacts",
        html: (
          <div className='swl__modal'>
            <div className='img__wrapper'>
              <img className='swl__gif' src={gif} alt='' />
              <img
                className='swl__img'
                src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
                alt=''
              />
            </div>
            <h2 className='Sos__header'>Finding Help</h2>
          </div>
        ),
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        console.log("stopped interval");
        if (result.isConfirmed) {
          window.location = "tel:911";
        } else if (result.isDenied) {
          // var contactsManager = navigator.contacts;
          // const supported =
          //   "contacts" in navigator && "ContactsManager" in window;
          window.location = "tel:";
        }
      });
      const timeout = setTimeout(() => helpNeeded(), 5000);
      // clearTimeout(timeout);
    },
    [needHelpLat, needHelpLong]
  );

  // let interval;

  const bind = useLongPress(true ? callback : null, {
    onStart: (e) => {
      e.preventDefault();
    },
    onCancel: (e) => {
      // e.preventDefault();
      // clearInterval(interval);
      // console.log("Press cancelled");
    },
    onFinish: (e) => {
      // e.preventDefault();
      // console.log("Long press finished");
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    threshold: 3000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  const ResponseModal = () => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      border: "2px solid #000",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    return (
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'>
        <Box sx={{ ...style, width: 200 }}>
          <h2 id='child-modal-title'>
            {helperDetails.first_name} {helperDetails.last_name} is coming to
            help!
          </h2>

          <Button
            onClick={handleClose}
            sx={{ m: 2 }}
            variant='contained'
            color='primary'>
            Mark Complete
          </Button>
        </Box>
      </Modal>
    );
  };

  return (
    <div className='sos'>
      {helperDetails && <ResponseModal />}
      <button {...bind} className='sos__button' />
    </div>
  );
};

export default Sos;
