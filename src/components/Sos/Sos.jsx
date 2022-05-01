import React from "react";
import swal from "sweetalert";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

import "./Sos.css";

const Sos = () => {
  const callback = React.useCallback(() => {
    swal("SOS Call Successful", "Please stay at your location", "success", {
      button: true,
    });
  }, []);

  const bind = useLongPress(true ? callback : null, {
    onStart: () => console.log("Press started"),
    onFinish: () => console.log("Long press finished"),
    onCancel: () => console.log("Press cancelled"),
    //onMove: () => console.log("Detected mouse or touch movement"),
    threshold: 3000,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  return (
    <div className='sos'>
      <button {...bind} className='sos__button' />
      {/* <button {...bind} style={{ width: 400, height: 200, fontSize: 50 }}>
        Press and hold
      </button> */}
    </div>
  );
};

export default Sos;
