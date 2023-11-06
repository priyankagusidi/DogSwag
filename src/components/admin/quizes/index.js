import React from 'react';
import QuestionList from './quizlist';
import {useState,useEffect} from 'react'
import axios from 'axios'
const App = () => {
    const [questions, setQuestions] = useState([]);

    async function fetchQuizes(){
    try {
        await axios.get('/api/quiz/all').then(res=>{
           console.log(res)
          setQuestions(res.data.Quizes)
        })
    } catch(e) {
      // statements
      console.log(e);
    }
  }

  useEffect(()=>{
      fetchQuizes()
  },[])

  return (
    <div>
      <QuestionList questions ={questions} setQuestions={ setQuestions}/>
    </div>
  );
};

export default App;
