import React, { useState, useRef } from "react";
import styles from './UploadLearnfileButton.module.css';

const UploadLearnfileButton = () => {

  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    console.log("Selected files:", fileArray);
    setFiles(fileArray);
  };

  const handleUpload = async () => {
    const userID = localStorage.getItem("userID");

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      console.log(`Uploading ${file.name}...`); 

      try {
        const response = await fetch(
          `http://18.232.193.248:8080/${userID}/predict/photos`,
          {
            method: "POST",
            body: formData,
            mode: 'no-cors',
          }
        );

        if (response.ok) {
          console.log(`${file.name} uploaded successfully`);
        } else {
          const errorText = await response.text();
          console.error(
            `Error uploading ${file.name}: ${response.statusText}`,
            errorText
          );
          alert(`Error uploading ${file.name}: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple onChange={handleFileChange} />
      <button className={styles.btn} onClick={openFileDialog}>파일선택</button>
      {files.length > 0 && (
        <>
          {/*<div className={styles.fileList}>
            {files.map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>*/}
          <button className={styles.btn} onClick={handleUpload}>
            업로드
          </button>
        </>
      )}

    </div>
  );
};

export default UploadLearnfileButton;