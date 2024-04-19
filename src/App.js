import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Component/Question';
import AIProgress from './Component/AIProgress';
import NextButton from './Component/NextButton';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式


function App() {
  const [answers, setAnswers] = useState({});
  const [aiProgress, setAIProgress] = useState(0); // AI作答進度
  const [currentBlock, setCurrentBlock] = useState(1); // 目前顯示的區塊
  const [score, setScore] = useState(0);

  const totalQuestions = 10; // 設定題目數量
  const questions = [
    {
      id: 1,
      text: "問題 1: 有一張很大張的紙，厚度為2mm，每對摺一次，厚度就變成原來的2倍；理論上若要讓這張紙變成1公尺的厚度，則最少要對摺幾次？",
      options: ["(A)7", "(B)8", "(C)9", "(D)10"],
      correctAnswer: "D"
    },
    {
      id: 2,
      text: "問題 2: 連續擲一粒均勻骰子三次，求三次中至少出現一次4點的機率為？",
      options: ["(A)91/216", "(B)125/216", "(C)71/216", "(D)61/216"],
      correctAnswer: "A"
    },
    {
      id: 3,
      text: "問題 3: 在計算機科學中，如果一個數據結構允許先進先出（FIFO）的特性，這種結構稱為什麼？",
      options: ["(A)堆疊", "(B)隊列", "(C)樹", "(D)圖"],
      correctAnswer: "B"
    },
    {
      id: 4,
      text: "問題 4: 哪一個行星是太陽系中最大的？",
      options: ["(A)地球", "(B)木星", "(C)火星", "(D)水星"],
      correctAnswer: "B"
    },
    {
      id: 5,
      text: "問題 5: 「畢達哥拉斯定理」是關於什麼形狀的性質？",
      options: ["(A)圓形", "(B)橢圓", "(C)正方形", "(D)三角形"],
      correctAnswer: "D"
    },
    {
      id: 6,
      text: "問題 6: 一光年大約是多少公里？",
      options: ["(A)約9.46億公里", "(B)約9.46萬公里", "(C)約9.46兆公里", "(D)約9.46百萬公里"],
      correctAnswer: "A"
    },
    {
      id: 7,
      text: "問題 7: 在一次賽跑比賽中，如果你超過了第二名，那麼你現在是第幾名？",
      options: ["(A)第一名", "(B)第二名", "(C)第三名", "(D)這是不可能的"],
      correctAnswer: "D"
    },
    {
      id: 8,
      text: "問題 8: 國際象棋中，哪一個棋子可以「跳過」其他棋子？",
      options: ["(A)國王", "(B)皇后", "(C)象", "(D)馬"],
      correctAnswer: "D"
    },
    {
      id: 9,
      text: "問題 9: 哪一種維生素可由人體在陽光照射下自行合成？",
      options: ["(A)維生素A", "(B)維生素B12", "(C)維生素C", "(D)維生素D"],
      correctAnswer: "D"
    },
    {
      id: 10,
      text: "問題 10: 歐洲的哪個國家有一個城市是既是首都也是國家名稱？",
      options: ["(A)盧森堡", "(B)巴黎", "(C)倫敦", "(D)里斯本"],
      correctAnswer: "A"
    }
  ];
  


  const handleAnswerChange = (questionId, answer) => {
    // console.log("Answer received for question ID " + questionId + ": " + answer);
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
    // const question = questions.find(q => q.id === questionId);
    // console.log("Correct answer should be: " + question.correctAnswer);
    // if (answer === question.correctAnswer) {
    //   console.log("Answer is correct, updating score.");
    //   setScore(prevScore => prevScore + 1);
    // } else {
    //   console.log("Answer is incorrect, score not updated.");
    // }
  };
  

  const handleNextBlock = () => {
    if (answers[currentBlock]) {  // 檢查是否已回答當前題目
      // 獲取當前問題
      const question = questions[currentBlock - 1]; // 陣列索引從0開始，而currentBlock從1開始
      if (answers[currentBlock] === question.correctAnswer) {
        setScore(prevScore => prevScore + 5);  // 答對加一分
      }
  
      if (currentBlock < questions.length) {
        setCurrentBlock(prevBlock => prevBlock + 1);
      } else {
        console.log('測驗完成，您的得分：' + score);
        alert('測驗已完成，您的得分：' + score);
      }
    } else {
      alert('請先作答再進行到下一題。');
    }
  };
  


  useEffect(() => {
    // 模擬 AI 作答的進度，每秒更新一次
    const interval = setInterval(() => {
      setAIProgress(prevProgress => {
        const newProgress = prevProgress + Math.floor(Math.random() * 10); // 隨機增加進度
        return newProgress > 100 ? 100 : newProgress; // 確保進度不超過 100%
      });
    }, 1000);

    return () => clearInterval(interval); // 清除 interval
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="score-display">當前得分：{score}</div>
        <div className="question-section">
          {questions.map((question, index) => (
            <div key={question.id} style={{ display: currentBlock === index + 1 ? 'block' : 'none' }}>
              <h2>《AI & 人腦大對決》</h2>
              <Question
                questionId={question.id}
                questionText={question.text}
                option1Text={question.options[0]}
                option2Text={question.options[1]}
                option3Text={question.options[2]}
                option4Text={question.options[3]}
                handleAnswerChange={handleAnswerChange}
              />
              <NextButton title={index + 1 === questions.length ? "完成測驗" : "下一組問題"} onClick={handleNextBlock} />
              {/* <NextButton title="下一組問題" onClick={() => setCurrentBlock(currentBlock + 1)} /> */}
            </div>
          ))}
        </div>
        <div className="ai-progress-section">
          <AIProgress progress={aiProgress} totalQuestions={totalQuestions} />
        </div>
      </header>
    </div>
  );
}

export default App;
