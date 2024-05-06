import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Question from './Component/Question';
import AIProgress from './Component/AIProgress';
import NextButton from './Component/NextButton';
import Timer from './Component/Timer';
import { formatTime } from './Function/timeUtils';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式


function App() {
  const isMounted = useRef(false);// 嚴格狀態的判斷
  const [answers, setAnswers] = useState({});
  const [aiProgress, setAIProgress] = useState(0); // AI作答進度
  const [currentBlock, setCurrentBlock] = useState(1); // 目前顯示的區塊
  const [score, setScore] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // 環境計時器
  const [completedTime, setCompletedTime] = useState(null); // 測驗完成時間
  const [AIcompletedTime, AIsetCompletedTime] = useState(null); // 測驗完成時間
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);// 問卷回答是否顯示
  const [randomNumber, setRandomNumber] = useState(0);// 決定回答速度



  const handleTimeUpdate = (newTime) => {
    setCurrentTime(newTime); // 更新時間狀態
  };
  const totalQuestions = 10; // 設定題目數量
  const questions = [
    {
      id: 1,
      text: "問題 1: 小明有 3 顆蘋果，他又買了 5 顆蘋果回家。請問小明一共有幾顆蘋果？",
      options: ["(A)5", "(B)7", "(C)8", "(D)15"],
      correctAnswer: "C"
    },
    {
      id: 2,
      text: "問題 2: 「一石二鳥」這個成語的意思是？",
      options: ["(A)一次只能做一件事情", "(B)一次做兩件事情", "(C)用石頭打鳥的方法", "(D)雙倍的收穫"],
      correctAnswer: "D"
    },
    {
      id: 3,
      text: "問題 3: 小明有 10 元，他買了一支筆花了 3 元，又買了一本書花了 5 元。請問他還剩下多少錢？",
      options: ["(A)2", "(B)3", "(C)5", "(D)7"],
      correctAnswer: "A"
    },
    {
      id: 4,
      text: "問題 4: 「百聞不如一見」這個成語的意思是？",
      options: ["(A)聽了很多次也不如親眼看一看", "(B)聽了很多事情就能比見到一件事情了解更多", "(C)一次見到比聽很多次更有意義", "(D)見到一次比聽一次更有意義"],
      correctAnswer: "A"
    },
    {
      id: 5,
      text: "問題 5: 植物是如何製造自己的食物的？",
      options: ["(A)透過呼吸作用", "(B)透過光合作用", "(C)透過土壤中的營養吸收", "(D)透過根部吸收水分"],
      correctAnswer: "B"
    },
    {
      id: 6,
      text: "問題 6: 太陽是什麼？",
      options: ["(A)行星", "(B)恆星", "(C)衛星", "(D)彗星"],
      correctAnswer: "B"
    },
    {
      id: 7,
      text: "問題 7: 水的三態中，哪一個態可以看到？",
      options: ["(A)氣態", "(B)液態", "(C)固態", "(D)都可以看到"],
      correctAnswer: "D"
    },
    {
      id: 8,
      text: "問題 8: 小華有 12 元，他花了一半的錢買了一支筆。請問他買筆時花了多少錢？",
      options: ["(A)3", "(B)6", "(C)9", "(D)12"],
      correctAnswer: "B"
    },
    {
      id: 9,
      text: "問題 9: 小明有 5 本書，他買了 3 本新書。請問小明現在總共有幾本書？",
      options: ["(A)5", "(B)6", "(C)7", "(D)8"],
      correctAnswer: "D"
    },
    {
      id: 10,
      text: "問題 10: 小華有 10 支鉛筆，他送了小明一半的鉛筆。請問小華還剩下幾支鉛筆？",
      options: ["(A)2", "(B)3", "(C)5", "(D)10"],
      correctAnswer: "C"
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
    
    if (isQuizCompleted) {
      // 如果測驗已完成，不執行任何操作
      return;
    }

    if (answers[currentBlock]) {  // 檢查是否已回答當前題目
      // 獲取當前問題
      const question = questions[currentBlock - 1]; // 陣列索引從0開始，而currentBlock從1開始
      if (answers[currentBlock] === question.correctAnswer) {
        setScore(prevScore => prevScore + 10);  // 答對加一分
      }
  
      if (currentBlock < questions.length) {
        setCurrentBlock(prevBlock => prevBlock + 1);
      } else {
        setIsQuizCompleted(true);
        setCompletedTime(currentTime); // 保存完成時間
        // console.log('測驗完成，您的得分：' + score);
        //alert('測驗已完成，您的得分：' + score);
      }
    } else {
      alert('請先作答再進行到下一題。');
    }

    
  };
  


  useEffect(() => {
    
    // 在進入頁面時，決定數字是10還是5
    const num = Math.random() * 10 + 1; // 產生1到10之間的亂數
    const numberToUse = num > 5 ? 10 : 4; // 將閥值設定在0.5

    setRandomNumber(numberToUse)
    // console.log('使用的數字：', numberToUse);
    // 模擬 AI 作答的進度，每秒更新一次
    const interval = setInterval(() => {
      setAIProgress(prevProgress => {
        const newProgress = prevProgress + Math.floor(Math.random() * numberToUse); // 隨機增加進度
        // 8是快的, 6是慢的
        return newProgress > 100 ? 100 : newProgress; // 確保進度不超過 100%
      });
    }, 1000);

    return () => clearInterval(interval); // 清除 interval
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Timer onTimeUpdate={handleTimeUpdate} show={true} />
        {completedTime && <div>您已完成作答, 總作答時間：{'['+formatTime(completedTime)+']'} </div>}
        {AIcompletedTime && <div>AI已完成作答, 總作答時間：{'['+formatTime(AIcompletedTime)+']'} </div>}
        <div className="question-section">
          {questions.map((question, index) => (
            <div key={question.id} style={{ display: currentBlock === index + 1 ? 'block' : 'none' }}>
              <h2>《AI & 人腦大對決》</h2>
              
        {isQuizCompleted && (
          <div className="google-form">
            {/* 在這裡放置你的 Google 表單嵌入代碼 */}
              {randomNumber === 4 ? (
                // 如果 RandomNumber 等於 4，嵌入第一個表單
                <iframe src="https://forms.gle/G4rc9MrbuLVtNTPx6" width="100%" style={{ height: '100vh' }} frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>
              ) : (
                // 如果 RandomNumber 等於 10，嵌入第二個表單
                <iframe src="https://forms.gle/jBFB1yrKRwwSPktc8" width="100%" style={{ height: '100vh' }} frameBorder="0" marginHeight="0" marginWidth="0">載入中…</iframe>

              )}
            </div>
        )}
              <div className="score-display">當前得分：{score}</div>
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
          <AIProgress progress={aiProgress} totalQuestions={totalQuestions} myTime={AIsetCompletedTime} />
        </div>
        
      </header>
    </div>
  );
}

export default App;
