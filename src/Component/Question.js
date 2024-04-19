// Question.js
import React from 'react';
import './Question.css'; // 引入 CSS 文件

function Question({ questionId, questionText, option1Text, option2Text, option3Text, option4Text, handleAnswerChange, disabled = false  }) {
  return (
    <div className="question">
      <p>{questionText}</p>
      <div className="options-container"> {/* 使用 div 包裹選項 */}
        <input
          type="radio"
          name={`question${questionId}`}
          value="option1"
          onChange={() => handleAnswerChange(questionId, 'option1')}
          disabled={disabled}
        />
        <label htmlFor="option1">{option1Text}</label>
        <br />
        <input
          type="radio"
          name={`question${questionId}`}
          value="option2"
          onChange={() => handleAnswerChange(questionId, 'option2')}
          disabled={disabled}
        />
        <label htmlFor="option2">{option2Text}</label>
        <br />
        <input
          type="radio"
          name={`question${questionId}`}
          value="option3"
          onChange={() => handleAnswerChange(questionId, 'option3')}
          disabled={disabled}
        />
        <label htmlFor="option3">{option3Text}</label>
        <br />
        <input
          type="radio"
          name={`question${questionId}`}
          value="option4"
          onChange={() => handleAnswerChange(questionId, 'option4')}
          disabled={disabled}
        />
        <label htmlFor="option4">{option4Text}</label>
      </div>
    </div>
  );
}

export default Question;
