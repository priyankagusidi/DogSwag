

import React, { useState } from 'react';
import dynamic from 'next/dynamic'
// const classnames = dynamic(() => import("classnames"), {
//   ssr: false,
// });
import classnames from 'classnames'

const VetTalkQuiz = ({ setDiscountStart, discountStart,sponsoredBy }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const correctAnswer = 'd';
  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOption == correctAnswer) {
      setDiscountStart(true)
      localStorage.setItem('Discount', true)
    }
  };

  const renderOptions = () => {
    const options = [
      { id: 'a', text: 'baby' },
      { id: 'b', text: 'train' },
      { id: 'c', text: 'country' },
      { id: 'd', text: 'dog' },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 text-white font-[Roboto]">
        {options.map((option) => (
          <div
            key={option.id}
            className={classnames(
              'bg-gray-400 rounded text-center cursor-pointer transition-colors duration-300',
                isSubmitted && {
                'bg-green-500 text-white': option.id === correctAnswer,
                'bg-red-500 btn-xs text-white': option.id === selectedOption && option.id !== correctAnswer,
              },
              selectedOption === option.id && ''
            )}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex relative justify-center items-end gap-10 flex-row-reverse">
      <div className="flex gap-2 items-center">
          <div>
            <img src="https://i.ibb.co/hcbJdGt/basil-Product1.webp" alt="" className="h-12 w-12 rounded" />
          </div>
          <div>
             <p className="text-xs text-left  bg-white text-secondary p-1 rounded-full">This quiz is sponsored by {sponsoredBy?.title} </p>
          </div>
      </div>
      <div className="bg-white p-6 rounded shadow-lg my-auto">
        <p className="mb-4 text-orange-500 animate-pulse opacity-100 font-semibold">What is a German Shepherd?</p>
        <div className="flex flex-col">{renderOptions()}</div>
        <div className="flex mt-4 justify-center">
          {isSubmitted ? (
            <button
              className="bg-gray-300 text-white py-1 px-4 rounded shadow-md"
              disabled={isSubmitted}
            >
              Submitted
            </button>
          ) : (
            <button
              className="bg-blue-500 md:ml-0 ml-12 text-white py-1 px-4 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetTalkQuiz;
