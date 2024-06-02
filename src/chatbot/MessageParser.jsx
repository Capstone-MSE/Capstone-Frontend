// import React from 'react';

// const MessageParser = ({ children, actions }) => {
//   const parse = (message) => {
//     if (message.includes('hello')) {
//       console.log('hi');
//     }
//   };

//   return (
//     <div>
//       {React.Children.map(children, (child) => {
//         return React.cloneElement(child, {
//           parse: parse,
//           actions: {},
//         });
//       })}
//     </div>
//   );
// };

// export default MessageParser;

import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes("hello")) {
      actions.handleMessage("hello");
    } else {
      actions.handleMessage(message);
    }
  };

  // 이 컴포넌트는 실제로 렌더링되지 않으므로 null을 반환합니다.
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      parse: parse,
    });
  });
};

export default MessageParser;
