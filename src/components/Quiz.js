import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import "./Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // ---------------------------Shuffle the questions when the component mounts or when the game resets
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setShowAnswer(false);
    setWrongAnswers([]);
  }, []);

  // -----------------------------Function to shuffle array (Fisher-Yates shuffle algorithm)
  const shuffleArray = (array) => {
    let newArray = [...array];
    let n = newArray.length;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleOptionClick = (selectedOption) => {
    // -----------------------------------------Check if the selected option is correct
    const correctAnswer = shuffledQuestions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    } else {
      // -------------------------------------------Add to wrong answers list
      setWrongAnswers([...wrongAnswers, {
        question: shuffledQuestions[currentQuestion].question,
        correctAnswer: correctAnswer
      }]);
    }

    setShowAnswer(true);

    // -----------------------------------------Move to the next question after 2 seconds
    setTimeout(() => {
      setShowAnswer(false);
      setCurrentQuestion(currentQuestion + 1);
    }, 2000);
  };

 
  return (
    <div className='contii'>
      <h1>Quiz App</h1>
      <h3>Score : {score}</h3>
      <div className="quiz">
      {currentQuestion < shuffledQuestions.length ? (
        <div className="question-container">
          {/* <h1>Quiz App</h1>
          <h3>Score : {score}</h3> */}
          <h2>{shuffledQuestions[currentQuestion].question}</h2>
          <div className="options-container">
            {shuffledQuestions[currentQuestion].options.map(option => (
              <button
                key={option}
                disabled={showAnswer}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <p className="correct-answer">
              Correct Answer: {shuffledQuestions[currentQuestion].correctAnswer}
            </p>
          )}
        </div>
      ) : (
        <div className="results">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score}</p>
          <h3>Incorrect Answers:</h3>
          <ul>
            {wrongAnswers.map((item, index) => (
              <li key={index}>
                {item.question} - Correct Answer: {item.correctAnswer}
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default Quiz;