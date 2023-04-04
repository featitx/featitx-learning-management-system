import React, { useState } from "react";
import  "./quizCreator.css";
import { useDispatch, useSelector } from "react-redux";


const QuizCreator = () => {
  const [questions, setQuestions] = useState([{ text: "", options: [],}]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizDesc, setQuizDesc] = useState("Type Yours Desc");
  const { user } = useSelector((state) => state.auth);

  const handleQuizDescTextChange = (event) => {
    setQuizDesc(event.target.value);
  };

  const handleQuestionTextChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionTextChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].options[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({ text: "", options: [] });
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions.length - 1);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setCurrentQuestion(Math.min(index, newQuestions.length - 1));
  };

  const handleAddOption = () => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].options.push("");
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].options.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answer = event.target.value;
    setQuestions(newQuestions);
  };


  const handleSubmit = ()=>{
    const data = {quizDesc:quizDesc,teacherType:user.teacherType,questions}
    console.log(data)
    fetch("/quiz/add-quiz", {
        body: JSON.stringify(data),
        method: "post",
        headers: {
            "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("auth_token"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          //setToast(true);
          //setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }
   
  return (
    <div className="container">
          <label className="question">
            Quiz Description:
            <input
              type="text"
              value={quizDesc}
              onChange={handleQuizDescTextChange}
            />
            </label>
      {questions.map((question, index) => (
        <div className="question" key={index}>
          <h3>Question {index + 1}</h3>
          <label>
            Question text:
            <input
              type="text"
              value={question.text}
              onChange={handleQuestionTextChange}
            />
          </label>
          <button className="remove-btn" onClick={() => handleRemoveQuestion(index)}>Remove question</button>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>
                Option {optionIndex + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionTextChange(event, optionIndex)}
                />
              </label>
              <button className="remove-btn" onClick={() => handleRemoveOption(optionIndex)}>Remove option</button>
            </div>
          ))}
          <button className="add-btn" onClick={handleAddOption}>Add option</button>
          <label>
            Correct answer:
            <input type="text" value={question.answer} onChange={handleAnswerChange} />
          </label>
        </div>
      ))}
      <button className="add-btn" onClick={handleAddQuestion}>Add question</button>
      <button className="submit-btn" onClick={handleSubmit }>Submit quiz</button>
    </div>
  );
}

export default QuizCreator;

