import React, { useEffect, useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupToken, setSignupToken] = useState('');

  useEffect(() => {
    // 회원가입 토큰 요청
    const fetchSignupToken = async () => {
      try {
        const response = await fetch('http://mobilesystems.site:8081/user/signup-token');
        const data = await response.json();
        setSignupToken(data.signupToken);
      } catch (error) {
        console.error('회원가입 토큰 요청 실패:', error);
      }
    };

    fetchSignupToken();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 회원가입 요청
      const response = await fetch(`http://mobilesystems.site:8081/user/${signupToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password })
      });

      if (response.ok) {
        console.log('회원가입 성공');
      } else {
        console.error('회원가입 실패:', response.statusText);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
        </div>
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
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;
