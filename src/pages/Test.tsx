import React from 'react';

function Test() {
  return (
    <div className="container">
      <h1>TEST 페이지</h1>
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
