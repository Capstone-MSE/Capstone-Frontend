import React, { useState } from "react";

const UploadLearnfileButton = () => {
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles).map((file, index) => {
      const newFileName = `predict_${index + 1}.jpg`;
      return new File([file], newFileName, { type: file.type });
    });
    setFiles(fileArray);
  };

  const handleUpload = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userID = localStorage.getItem("userID");
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `http://3.229.83.9/${userID}/predict/photos`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: { accessToken },
            },
          }
        );

        if (response.ok) {
          console.log(`${file.name} uploaded successfully`);
        } else {
          console.error(`Error uploading ${file.name}: ${response.statusText}`);
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
