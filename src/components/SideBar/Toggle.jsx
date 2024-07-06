import React from "react";

function Toggle({ isChatting, setIsChatting }) {
  return (
    <div>
      <span>PROMA chatting</span>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChatting}
          onChange={() => setIsChatting(!isChatting)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default Toggle;
