import React, { useState, useEffect } from 'react';
import Question from './Question';
function AIProgress({ progress, totalQuestions }) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0); // 追蹤目前正在進行的問題數
  const [answeredCorrectly, setAnsweredCorrectly] = useState(0); // 已答對的題數
  const questions = [
    {
      id: 1,
      text: "問題 1: 有一張很大張的紙，厚度為2mm，每對摺一次，厚度就變成原來的2倍；理論上若要讓這張紙變成1公尺的厚度，則最少要對摺幾次？",
      options: ["(A)7", "(B)8", "(C)9", "(D)10"]
    },
    {
      id: 2,
      text: "問題 2: 連續擲一粒均勻骰子三次，求三次中至少出現一次4點的機率為？",
      options: ["(A)91/216", "(B)125/216", "(C)71/216", "(D)61/216"]
    },
    {
      id: 3,
      text: "問題 3: 在計算機科學中，如果一個數據結構允許先進先出（FIFO）的特性，這種結構稱為什麼？",
      options: ["(A)堆疊", "(B)隊列", "(C)樹", "(D)圖"]
    },
    {
      id: 4,
      text: "問題 4: 哪一個行星是太陽系中最大的？",
      options: ["(A)地球", "(B)木星", "(C)火星", "(D)水星"]
    },
    {
      id: 5,
      text: "問題 5: 「畢達哥拉斯定理」是關於什麼形狀的性質？",
      options: ["(A)圓形", "(B)橢圓", "(C)正方形", "(D)三角形"]
    },
    {
      id: 6,
      text: "問題 6: 一光年大約是多少公里？",
      options: ["(A)約9.46億公里", "(B)約9.46萬公里", "(C)約9.46兆公里", "(D)約9.46百萬公里"]
    },
    {
      id: 7,
      text: "問題 7: 在一次賽跑比賽中，如果你超過了第二名，那麼你現在是第幾名？",
      options: ["(A)第一名", "(B)第二名", "(C)第三名", "(D)這是不可能的"]
    },
    {
      id: 8,
      text: "問題 8: 國際象棋中，哪一個棋子可以「跳過」其他棋子？",
      options: ["(A)國王", "(B)皇后", "(C)象", "(D)馬"]
    },
    {
      id: 9,
      text: "問題 9: 哪一種維生素可由人體在陽光照射下自行合成？",
      options: ["(A)維生素A", "(B)維生素B12", "(C)維生素C", "(D)維生素D"]
    },
    {
      id: 10,
      text: "問題 10: 歐洲的哪個國家有一個城市是既是首都也是國家名稱？",
      options: ["(A)盧森堡", "(B)巴黎", "(C)倫敦", "(D)里斯本"]
    }
  ];
  
  useEffect(() => {
    // 更新目前正在進行的問題數，將初始值設為 1
    setCurrentQuestion(Math.floor((totalQuestions * progress) / 100) || 0);
  }, [progress, totalQuestions]);
  
  useEffect(() => {
    // 模擬隨機答對或答錯，只模擬新增的題目
    let correctAnswers = answeredCorrectly// >= 0 ? answeredCorrectly : 0; // 如果 answeredCorrectly >= 0 才從前次的題數開始算
    for (let i = currentQuestion - 1; i < currentQuestion; i++) {
      const randomAnswer = Math.random() < 0.9 ? 'correct' : 'incorrect'; // 提高答對機率到70%
      if (randomAnswer === 'correct') {
        correctAnswers++;
      }
    }
    // 計算已答對的題數
    setAnsweredCorrectly(correctAnswers);
  }, [currentQuestion]);
  
  useEffect(() => {
    const newScore = (answeredCorrectly-1) * 5; // 每題得 5 分
    setScore(newScore);
  },[answeredCorrectly])// [currentQuestion, totalQuestions, answeredCorrectly]);
  
  return (
    <div>
      <p>{progress === 100 ? 'AI 已完成作答' : 'AI 作答中...進度：' + progress + '%'}</p>
      {progress < 100 && (
        <Question
          questionId={currentQuestion}
          questionText={questions[currentQuestion].text}
          option1Text={questions[currentQuestion].options[0]}
          option2Text={questions[currentQuestion].options[1]}
          option3Text={questions[currentQuestion].options[2]}
          option4Text={questions[currentQuestion].options[3]}
          handleAnswerChange={() => {}}
          disabled={true}
        />
      )}
      <p>{progress === 100 ? '' : '目前已經完成第 ' + (currentQuestion) + ' 題'}</p>
      <p>得分：{score}</p>
    </div>
  );
}

export default AIProgress;
