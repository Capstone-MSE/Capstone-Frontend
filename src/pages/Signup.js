import React, { useState } from 'react';

function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, password })
      });
      console.log('회원가입 성공');
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

export default SignUp;
