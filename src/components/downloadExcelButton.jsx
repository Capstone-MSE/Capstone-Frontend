import React from "react";
import styles from "./keyValue.module.css";

const serverURL = "http://100.25.242.208:8080/";
const userID = localStorage.getItem("userID");

class DownloadExcelButton extends React.Component {
  handleClick = async () => {
    try {
      const response = await fetch(`${serverURL}ai/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userID }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.xlsx"; // 원하는 파일 이름으로 변경하세요
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    return (
      <button className={styles.submitButton} onClick={this.handleClick}>
        엑셀 다운로드
      </button>
    );
  }
}

export default DownloadExcelButton;
