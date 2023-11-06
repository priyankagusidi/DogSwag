import React, { useState ,useEffect} from 'react';
import axios from 'axios'

const QuestionList = ({questions, setQuestions}) => {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: 0,
  });
  const [editIndex, setEditIndex] = useState(null);
  console.log(questions)
  const handleAddQuestion = async() => {
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions([...questions, newQuestion]);
      console.log(newQuestion)
      return
      try {
        await axios.post('/api/quiz/create',newQuestion).then(res=>{
          console.log(res.data)
        })
      } catch(e) {
        console.log(e);
      }

    }
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: 0,
    });
  };

  const handleQuestionChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      question: e.target.value,
    });
  };

  const handleOptionChange = (optionIndex, e) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.map((option, index) =>
        index === optionIndex ? e.target.value : option
      ),
    });
  };

  const handleAnswerChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      answer: parseInt(e.target.value),
    });
  };

  const handleEditQuestion = (index) => {
    setNewQuestion(questions[index]);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: 0,
    });
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddQuestion();
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    if (editIndex === index) {
      handleCancelEdit();
    }
  };




  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Question List</h1>
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {editIndex !== null ? 'Edit Question' : 'New Question'}
        </h3>
        <input
          type="text"
          value={newQuestion.question}
          onChange={handleQuestionChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter the question"
          required
        />
        <ul>
          {newQuestion.options.map((option, optionIndex) => (
            <li key={optionIndex} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(optionIndex, e)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            </li>
          ))}
        </ul>
        <select
          value={newQuestion.answer}
          onChange={handleAnswerChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full focus:outline-none focus:ring focus:border-blue-500"
        >
          {newQuestion.options.map((_, optionIndex) => (
            <option key={optionIndex} value={optionIndex}>
              Option {optionIndex + 1}
            </option>
          ))}
        </select>
        <div className="flex mt-4">
          {editIndex !== null ? (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mr-4 focus:outline-none"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            >
              Add Question
            </button>
          )}
        </div>
      </form>

      <div>
        {questions.map((question, index) => (
          <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Question {index + 1}</h3>
            <p className="mb-4">{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex} className="mb-2">
                  {option}
                </li>
              ))}
            </ul>
            <p className="font-semibold mt-4">Correct Answer: Option {parseInt(question.answer)+1}</p>
            <div className="flex mt-4">
              <button
                onClick={() => handleEditQuestion(index)}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mr-4 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
