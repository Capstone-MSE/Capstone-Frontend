import React from 'react';
import styles from './MainPage.module.css'; // CSS 모듈을 가져옵니다.
import { useNavigate } from 'react-router-dom';
import upload_icon from '../img/upload_icon.png';
import download_icon from '../img/download_icon.png'

import FileUploadButton from '../components/FileUploadButton';

const MainPage = () => {
    const navigate = useNavigate();
    const handleLearnClick = () => {
        navigate('/learn'); 
      };

    return (
        <div className={styles.container}>
          <h1>           Reader.</h1>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={upload_icon} alt="Upload" className={styles.icon} />
            </div>
            <p>첫 사용이신가요?</p>
            <p>데이터화할 이미지를 업로드해 학습을 진행해주세요.</p>
            <button className={`${styles.btn} ${styles.learn}`} onClick={handleLearnClick}>학습하기</button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={download_icon} alt="Download" className={styles.icon} />
            </div>
            <p>이미지를 통해 데이터를 추출하세요.</p>
            <button className={`${styles.btn} ${styles.extract}`} onClick={() => navigate('/extract')}>추출하기</button>
          </div>
        </div>
      );
    };
    

export default MainPage;
