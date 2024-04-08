import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Modal from './Modal';
 
const serverURL = 'http://100.25.242.208:8080/';

function FileUploadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reopen, setReopen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reopenButton = () => {
    if (reopen){
      return <div>
        <button onClick={() => setIsModalOpen(true)}>다시 열기</button>
      </div>;
    }
    else return;
  };

  
  
  

  const handleImgUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', 'DKU18son');

      const aiOcrURL = `${serverURL}ai/ocr`;
      fetch(aiOcrURL, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        setAiResponse(data);
        setIsModalOpen(true);
        setReopen(true);
      })
      .catch((error)=> {
        console.error('Error:', error);
      })
      .finally(()=> {
        setIsLoading(false);
      });
    }
  };

  return (
    <div>
    <div>
      <input type="file" onChange={handleImgUpload} />
      {isLoading ? (
        <div><BeatLoader /></div>
      ) : (
        <Modal isOpen={isModalOpen} onClose={closeModal} AiData={aiResponse}>
        </Modal>
        )
    } 
    </div>
    {reopenButton()}
    </div>
  );
}

export default FileUploadButton;