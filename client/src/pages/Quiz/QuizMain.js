import React, { useEffect, useState } from 'react';
import Start from '../../components/quiz/Start';
import Quiz from '../../components/quiz/QuizCard';
import Result from '../../components/quiz/Result';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


const QuizMain = () => {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);
  const { user } = useSelector((state) => state.auth);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [desc, setDesc] = useState(false);
  const { id} = useParams();

  // Load JSON Data
  useEffect(() => {
    if(id && user.teacherType){
    fetch(`/quiz/quiz/${id}/${user.teacherType}`,{method: "get",headers: {
      "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("auth_token"),
  },})
      .then(res => res.json())
      .then(data => {setQuizs(data.quiz.questions); setDesc(data.quiz.quizDesc)})
}
  }, [id,user.teacherType]);

  // Set a Single Question
  useEffect(() => {
    if (quizs?.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    if (wrongBtn) {
      wrongBtn.classList.remove('bg-danger');
    }
    
    const rightBtn = document.querySelector('button.bg-success');
    if (rightBtn) {
      rightBtn.classList.remove('bg-success');
    }
    
    setQuestionIndex(questionIndex + 1);
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    if (wrongBtn) {
      wrongBtn.classList.remove('bg-danger');
    }
    
    const rightBtn = document.querySelector('button.bg-success');
    if (rightBtn) {
      rightBtn.classList.remove('bg-success');
    }
    
  }

  return (
    <>
      {/* Welcome Page */}
      <Start
        startQuiz={startQuiz}
        showStart={showStart}
        desc={desc}
      />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        startOver={startOver} />
    </>
  );
}

export default QuizMain;
