import React, { useState, useEffect } from 'react';


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
            <input 
            type="text"
            value={inputValue}
            onChange={handleChange} 
            />
            <button onClick={submit}>완료</button> 
        </div>
        <div>
            {key && (
                <input
                type="text"
                value={value}
                onChange={onChange}
                />
            )}
            {key && <button onClick={addPair}>더하기</button>}
        </div>
        {key && <p>Key: {key}</p>}
        {key && value && <p> Value: {value}</p>}
        {keyValuePair.length > 0 && (
            <div>
                {keyValuePair.map((pair, index) => (
                    <p key={index}>Key: {pair.key}, Value: {pair.value}</p>
                ))}
            </div>
        )}
        </div>
    );
    };
      

export default KeyValue;
