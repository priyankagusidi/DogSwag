import React, { useState } from 'react';

const Quiz = ({sponsoredBy}) => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Madrid', 'Berlin', 'Rome'],
      answer: 0,
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
      answer: 0,
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
      answer: 0,
    },
    // Add more questions as needed
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const correctAnswerIndex = questions[currentQuestion].answer;
    if (selectedOption === correctAnswerIndex) {
      setScore(score + 1);
    }

    setSelectedOption('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  // const handleRestartQuiz = () => {
  //   setCurrentQuestion(0);
  //   setSelectedOption('');
  //   setScore(0);
  //   setShowScore(false);
  // };

  return (
    <div className="w-72 mx-auto py-2 px-4 bg-black  shadow-md bg-opacity-90 rounded-xl h-72 overflow-auto">
       <div className="py-2 text-center">
             <p className="text-xs text-left  bg-amber-200 text-secondary p-1 rounded-md">This quiz is sponsored by {sponsoredBy?.title} </p>
      </div>
      {showScore ? (
        <div>
          <h1 className="text-xl font-bold mb-2 text-white">Quiz Score</h1>
          <p className="text-sm mb-4 text-white">
            You scored {score} out of {questions.length}
          </p>
          {
            score >= 3 ?
            <div className="text-yellow-500">
              <img src="/assets/icons/party-popper.svg" className="w-16"/>
              Congrats ! Now you got 30% discount on all the product listed below for next 1 hour.
            </div>
            :
            <div className="text-red-500">
              Oops ! try again after 1 hour.
            </div>
          }
          {/*<button
            onClick={handleRestartQuiz}
            className="text-white px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none"
          >
            Restart Quiz
          </button>*/}
        </div>
      ) : (
        <div>
          <h1 className="text-white text-xl font-bold mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </h1>
          <p className="text-white text-md mb-4">{questions[currentQuestion].question}</p>
          <ul className="mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`px-4 mt-1 text-xs py-2 border shadow-md rounded-lg cursor-pointer ${
                  selectedOption === index ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === ''}
            className={`px-4 py-1 text-xs bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none ${
              selectedOption === '' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
