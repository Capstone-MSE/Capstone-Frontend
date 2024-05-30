import React, { useState, useEffect } from 'react';
import styles from './keyValue.module.css'
import AWS from "aws-sdk";



const KeyValue = ({ AiTextData, coloredIndexes, onChange, coloredBbox, AiData, selectedFileName }) => {
    const [inputValue, setInputValue] = useState('');
    const [key, setKey] = useState('');
    const [keyValuePair, setKeyValuePair] = useState([]);
    const [labelPair, setlabelPair] = useState([]);
    const [value, setValue] = useState('');
    

    const sortedIndexes = [...coloredIndexes].sort((a, b) => a - b);
    // const value = sortedIndexes.map(index => AiTextData[index]).join(' ');

    const calculateValue = () => {
        return sortedIndexes.map(index => AiTextData[index]).join(' ');
    };

      useEffect(() => {
        setValue(calculateValue());
      }, [coloredIndexes, AiTextData]);
    

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const submit = () => {
        setKey(inputValue);
    };
    
    const addPair = () => {
        const index = { val: sortedIndexes };
        const key_name = key;
        setlabelPair(prevState => [...prevState, { key_name, index }]);
        setKeyValuePair(prevState => [...prevState, { key, value }]);
        setKey('');
        setInputValue('');
        setValue('');
        coloredBbox.current = [];
        console.log(keyValuePair);
    };

    const saveToS3 = () => {
        const REGION = process.env.REACT_APP_REGION;
        const ACESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
        const SECRET_ACESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY;
        const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
        const userId = localStorage.getItem('userId')

        AWS.config.update({
            region: REGION,
            accessKeyId: ACESS_KEY_ID,
            secretAccessKey: SECRET_ACESS_KEY_ID,

        });

        const s3 = new AWS.S3();
        const date = Date.now();

        let jsonUploaded = false;
        let imgUploaded = false;

        //  json S3 업로드
        const jsonfile = `file_${date}.json`;
        const jsondata = {
            word_list: AiData.content.text,
            bbox_list: AiData.content.bbox,
            label: labelPair,
            file_name: selectedFileName,
            
        };

        const jsonparams = {
            ACL: 'private',
            Bucket: BUCKET_NAME,
            Key: `${userId}/${jsonfile}`,
            Body: JSON.stringify(jsondata),
            ContentType: 'application/json',
        };
        
        s3.upload(jsonparams, (err, s3Data) => {

            console.log('data:', jsondata);

            if (err) {
                console.log('S3 업로드 오류: json', err);
            } else {
                console.log('S3 업로드 성공: json', s3Data);

                const blob = new Blob([JSON.stringify(jsondata)], { type: 'application/json' });
                const formdata = new FormData();
                formdata.append("profile_photo", blob, jsonfile);
                
                const requestOptions = {
                    method: 'POST',
                    body: formdata,
                    mode: 'no-cors',
                    redirect: 'follow'
                };

                jsonUploaded = true;
                checkAllUploaded();
                
                fetch(`http://18.232.193.248:8080/${userId}/photo`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            }
        });
        
        //  이미지 S3 업로드
        const imgfile = `file_${date}.jpg`;
        const imgBase64 = `data:image/jpeg;base64,${AiData.content.image}`;

        fetch(imgBase64)
        .then(res => res.blob())
        .then(blob => {
            const imgparams = {
                ACL: 'private',
                Bucket: BUCKET_NAME,
                Key: `${userId}/${imgfile}`,
                Body: blob,
                ContentType: 'image/jpeg',
            };

            s3.upload(imgparams, (err, s3Data) => {
                if (err) {
                    console.log('S3 업로드 오류: 이미지', err);
                } else {
                    console.log('S3 업로드 성공: 이미지', s3Data);

                    const formdata = new FormData();
                    formdata.append("profile_photo", blob, imgfile);

                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        mode: 'no-cors',
                        redirect: 'follow'
                    };

                    imgUploaded = true;
                    checkAllUploaded();

                    fetch(`http://18.232.193.248:8080/${userId}/photo`, requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                }
            });
        })
        .catch(error => {
            console.log('Base64 인코딩 에러:', error);
        });

        const checkAllUploaded = () => {
            if (jsonUploaded && imgUploaded) {
                alert('성공적으로 저장되었습니다.');
            }
        };

        }



      
    return (
        <div>
        <div>
            <label>
            <h2 className={`${styles.element}`}><b>Key: </b>
                <input className={`${styles.form}`}
                type="text"
                value={inputValue}
                onChange={handleChange} 
                />
                <button className={`${styles.submitButton}`} onClick={submit}>입력</button> 
            </h2>
            </label>
        </div>
        <div>
            {key && (
                <label>
                <h2 className={`${styles.element}`}><b>Value: </b>
                    <input className={`${styles.form}`}
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                {key && <button className={`${styles.submitButton}`} onClick={addPair}>추가</button>}
                </h2>
                </label>
            )}
        </div>
        <div className={styles.container}>  
            {key && <b>Key: {key}<br/></b>}
            {key && value && <b> Value: {value}<br/></b>}
        </div>
        {keyValuePair.length > 0 && (
            <div className={styles.align}>
                {keyValuePair.map((pair, index) => (
                    <b key={index}>Key: {pair.key}, Value: {pair.value}<br/></b>
                ))}
            </div>
        )}
        <button 
            className={`${styles.saveButton}`}
            type="button"  
            onClick={saveToS3}>저장하기</button>
        </div>
    );
};
   

export default KeyValue;
