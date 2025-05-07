import React from 'react';

function Test() {
  return (
    <div className="container">
      <h1>TEST 페이지</h1>
      <p>로그인 후 보이는 화면입니다.</p>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => window.history.back()}
        >
          <span className="icon">⬅️</span>
          이전 페이지
        </button>
      </div>
    </div>
  );
}

export default Test;
