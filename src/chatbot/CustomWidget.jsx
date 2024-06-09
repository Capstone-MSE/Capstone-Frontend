import React from 'react';

const CustomWidget = ({ imageurl }) => {
  return (
    <div>
      <img src={`data:image/png;base64,${imageurl}`} alt="Chat Image" style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default CustomWidget;
