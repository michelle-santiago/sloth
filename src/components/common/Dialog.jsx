import React from "react";

const Dialog = (props) => {
  return (
    <div className="dialog-background fixed inset-0 grid place-items-center bg-slate-900/50 z-[999]">
      <div className="dialog-container bg-white p-5 flex flex-col flex-nowrap items-center justify-start gap-5">
        <div className="message">{props.message}</div>
        <div className="buttons flex flex-row flex-nowrap justify-center items-center gap-5">
          <button
            type="button"
            onClick={() => props.onDialog(true)}
            className="px-5 py-2 text-white bg-primary"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => props.onDialog(false)}
            className="px-5 py-2 text-white bg-neutral"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;