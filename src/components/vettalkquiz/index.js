import React, { useState ,useEffect} from 'react';
import axios from 'axios'

const Quiz = ({sponsoredBy,setShowQuiz,discountProduct,questions}) => {
  
  // const questions = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['Paris', 'Madrid', 'Berlin', 'Rome'],
  //     answer: 0,
  //   },
  //   {
  //     question: 'Which planet is known as the Red Planet?',
  //     options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
  //     answer: 0,
  //   },
  //   {
  //     question: 'Which planet is known as the Red Planet?',
  //     options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
  //     answer: 0,
  //   },
  // ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);

      const correctAnswerIndex = questions[currentQuestion].answer;
      if (optionIndex == correctAnswerIndex) {
        setScore(score + 1);
      }

      setTimeout(() => {
        setSelectedOption(null);
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowScore(true);
           if(score >= 2){
              const discountExpiresAt = new Date().getTime() + 60 * 1000; // Current time + 1 hour
             localStorage.setItem('discountExpiresAt', discountExpiresAt);
             discountProduct()
           }
           
           reduceCredit()
        }
      }, 1000);
    }

  };
console.log(score)
 async function reduceCredit(){
    try{
      await axios.put(`/api/brand/reduce/${sponsoredBy._id}`)
    }catch(e){
      console.log(e)
    }
  }

 
 console.log(questions)

  // return

  return (
    <div className="z-50 w-72 mx-auto py-2 px-4 bg-black  shadow-md bg-opacity-90 rounded-xl h-72 overflow-auto">
      <div className="flex justify-center">
             <p className="text-xs w-fit text-left  bg-amber-500 text-secondary p-1 rounded-full">This quiz is sponsored by {sponsoredBy?.title} </p>
      </div>
       <img src="assets/icons/cross.svg" onClick={()=>setShowQuiz(false)} className="w-5 absolute top-2 right-2 cursor-pointer invert"/>
      {showScore ? (
        <div className="text-white">
          <h1 className="text-xl font-bold mb-4">Quiz Score</h1>
          <p className="text-md mb-4">
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
              Oops ! Try again.
            </div>
          }
        </div>
      ) : (
        <div className="text-white">
          <h1 className="text-xl font-bold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h1>
          <p className="text-sm mb-4">{questions[currentQuestion].question}</p>
          <ul className="mb-4">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`px-4 py-2 border rounded-lg cursor-pointer text-black text-xs mt-1 ${
                  selectedOption === index ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
