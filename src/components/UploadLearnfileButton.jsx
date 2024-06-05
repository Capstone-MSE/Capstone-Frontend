import React, { useState } from "react";

const UploadLearnfileButton = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    console.log("Selected files:", fileArray);
    setFiles(fileArray);
  };

  const handleUpload = async () => {
    const accessToken = localStorage.getItem("accessToken");
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

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadLearnfileButton;
