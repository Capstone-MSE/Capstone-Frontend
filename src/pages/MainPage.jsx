import React from 'react';
import styles from './MainPage.module.css'; 
import { useNavigate } from 'react-router-dom';
import upload_icon from '../img/upload_icon.png';
import download_icon from '../img/download_icon.png'

import Chatbot from 'react-chatbot-kit'; 
import 'react-chatbot-kit/build/main.css';

import config from "../chatbot/config";
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

import './chatbot.css';



const MainPage = () => {
    const navigate = useNavigate();
    const learnClick = () => {
      navigate('/learn'); 
      };
    const logInClick = () => {
      navigate('/login');
    };
    const signUpClick = () => {
      navigate('/signup');
    };

      return (
        <div className={styles.container}>
          <div className="header">
            <h1>Reader</h1>
            <div className="buttons">
              <button type="button" onClick={logInClick}>로그인</button>
              <button type="button" onClick={signUpClick}>회원가입</button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={upload_icon} alt="Upload" className={styles.icon} />
            </div>
            <p>첫 사용이신가요?</p>
            <p>데이터화할 이미지를 업로드해 학습을 진행해주세요.</p>
            <button className={`${styles.btn} ${styles.learn}`} onClick={learnClick}>학습하기</button>
          </div>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={download_icon} alt="Download" className={styles.icon} />
            </div>
            <p>이미지를 통해 데이터를 추출하세요.</p>
            <button className={`${styles.btn} ${styles.extract}`} onClick={() => navigate('/extract')}>추출하기</button>
          </div>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      );
    }      
    

export default MainPage;
