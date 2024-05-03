import React, { useState, useEffect } from 'react';
import styles from './keyValue.module.css'


const KeyValue = ({ AiTextData, coloredIndexes, onChange, coloredBbox }) => {
    const [inputValue, setInputValue] = useState('');
    const [key, setKey] = useState('');
    const [keyValuePair, setKeyValuePair] = useState([]);
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
        setKeyValuePair(prevState => [...prevState, { key, value }]);
        setKey('');
        setInputValue('');
        setValue('');
        coloredBbox.current = [];
        console.log(keyValuePair);
    };

      
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
        </div>
    );
    };
      

export default KeyValue;
