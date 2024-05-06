// Question.js
import React from 'react';
import './Question.css'; // 引入 CSS 文件

function Question({ questionId, questionText, option1Text, option2Text, option3Text, option4Text, handleAnswerChange, disabled = false  }) {
  return (
    <div className="question">
      <p>{questionText}</p>
      <div className="options-container"> {/* 使用 div 包裹選項 */}
        <input
          id={`option1${questionId}`}
          type="radio"
          name={`question${questionId}`}
          value="option1"
          onChange={() => handleAnswerChange(questionId, 'A')}
          disabled={disabled}
        />
        <label htmlFor={`option1${questionId}`}>{option1Text}</label>
        <br />
        <input
          id={`option2${questionId}`}
          type="radio"
          name={`question${questionId}`}
          value="option2"
          onChange={() => handleAnswerChange(questionId, 'B')}
          disabled={disabled}
        />
        <label htmlFor={`option2${questionId}`}>{option2Text}</label>
        <br />
        <input
          id={`option3${questionId}`}
          type="radio"
          name={`question${questionId}`}
          value="option3"
          onChange={() => handleAnswerChange(questionId, 'C')}
          disabled={disabled}
        />
        <label htmlFor={`option3${questionId}`}>{option3Text}</label>
        <br />
        <input
          id={`option4${questionId}`}
          type="radio"
          name={`question${questionId}`}
          value="option4"
          onChange={() => handleAnswerChange(questionId, 'D')}
          disabled={disabled}
        />
        <label htmlFor={`option4${questionId}`}>{option4Text}</label>
      </div>
    </div>
  );
}

export default Question;
