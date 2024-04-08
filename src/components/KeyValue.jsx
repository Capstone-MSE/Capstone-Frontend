import React, { useState } from 'react';


const KeyValue = ({ AiTextData, coloredIndexes, onChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [key, setKey] = useState('');
    const [keyValuePair, setKeyValuePair] = useState([]);


    const sortedIndexes = [...coloredIndexes].sort((a, b) => a - b);
    const value = sortedIndexes.map(index => AiTextData[index]).join(' ');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const submit = () => {
        setKey(inputValue);
    };
    
    const addPair = () => {
        setKeyValuePair(prevState => [...prevState, { key: {key}, value: {value} }]);
        console.log(keyValuePair);
    };

  return (
    <div>
        <div>
            <input 
            type="text"
            value={inputValue}
            onChange={handleChange} />
            <button onClick={submit}>완료</button> 
        </div>
        <div>
           {key && <input
            type="text"
            value={value}
            onChange={onChange}
         />}
            {key && <button onClick={addPair}>더하기</button>}
        </div>
        {key && <p>Key: {key}</p>} 
    </div>
    
  );
};

export default KeyValue;
