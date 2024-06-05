import React from "react";
import styles from "./keyValue.module.css";

const serverURL = "http://100.25.242.208:8080/";
const userID = localStorage.getItem("userID");

class FinishLearnButton extends React.Component {
  handleClick = async () => {
    try {
      await fetch(`${serverURL}ai/train`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <button className={styles.submitButton} onClick={this.handleClick}>
        완성
      </button>
    );
  }
}

export default FinishLearnButton;
