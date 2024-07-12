import React from "react";
import useInput from "../hooks/useInput";
import SideBar from "../components/SideBar/SideBar";
import styles from "./mainPage.module.css"

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
        <SideBar />
        <div className={styles.content}>
          <label>
            Input:
            <input type="text" value={name.value} onChange={name.onChange} />
          </label>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MainPage;
