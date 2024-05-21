import React, { useEffect } from 'react';
import FileUploadButton from '../components/FileUploadButton';
import styles from './Learn.module.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/CookieUtil'; 

const LearnPage = () => {

    const navigate = useNavigate();
    const mainClick = () => {
        navigate('/');
    };

    useEffect(() => {
        // 페이지 로드시 쿠키에서 토큰 가져오기
        const accessToken = getCookie("token");
        if (!accessToken || !localStorage.getItem('accessToken', accessToken)) {
            navigate('/');
            alert('로그인 후 이용해주세요');
        }
    }, [navigate]);

    return (
        <div className={styles.container}>
            <div className="header">
                <button className={`${styles.mainbtn}`} onClick={mainClick}><h1>Reader.</h1></button>
            </div>
            <div className={styles.card}>
                <h2><b>자신만의 모델을 생성하세요!</b></h2>
                <p>데이터화할 이미지를 업로드해 학습을 진행해주세요.</p>
                <p>정확도 향상을 위해 최소 10장 이상의 이미지를 학습시키는 것을 추천합니다.</p>
                <FileUploadButton/>
            </div>
        </div>
    );
};
export default LearnPage;