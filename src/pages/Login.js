import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 로그인 요청
      const response = await fetch(`http://mobilesystems.site:8081/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        console.log('로그안 성공');
      } else {
        console.error('로그인 실패:', response.statusText);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            아이디:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;