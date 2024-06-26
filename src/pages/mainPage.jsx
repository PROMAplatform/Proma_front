import React from "react";
import useInput from "../hooks/useInput";

function MainPage() {
  const name = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name.value}`);
    name.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Input:
          <input type="text" value={name.value} onChange={name.onChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MainPage;
