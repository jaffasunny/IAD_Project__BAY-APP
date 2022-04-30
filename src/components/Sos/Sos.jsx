import React from "react";

import "./Sos.css";

const Sos = () => {
//   var timeoutId = 0;

//   $("#myElement")
//     .on("mousedown", function () {
//       timeoutId = setTimeout(myFunction, 1000);
//     })
//     .on("mouseup mouseleave", function () {
//       clearTimeout(timeoutId);
//     });

  const toggleButton = (btn) => {
    btn.classList.toggle("sos__buttonAfter");
    btn.classList.toggle("sos__button");
  };

  return (
    <div className='sos'>
      <button
        className='sos__button'
        onMouseDownCapture={(e) => {
          toggleButton(e.target);
        }}
        onMouseDown={(e) => {
          toggleButton(e.target);
        }}
      />
    </div>
  );
};

export default Sos;
