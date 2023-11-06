import React from 'react';
import {useState,useEffect} from 'react'
import axios from 'axios'

const QuestionsList = ({setCurrentVideo,currentVideo}) => {
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

  // console.log(q)
  async function handleQuizes(question){
    try {
        await axios.put(`/api/video/edit/${currentVideo._id}`,{question:question._id}).then(res=>{
           console.log(res)
           fetchQuizes()
        })

        var update = currentVideo;

        const isExist = currentVideo.quizes.includes(question._id)
        
        if(isExist){
           update = {...currentVideo,quizes:currentVideo.quizes.filter((q)=>q !== question._id)}
        } else{
           update = {...currentVideo,quizes:[...currentVideo.quizes,question._id]}
        }
        console.log(update)
        setCurrentVideo(update)
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold">Questions List</h1>
      <div className="">
        {questions.map((question, index) => (
           <div key={question._id} className="flex mt-2 gap-2">
                 <span className="p-2 bg-white rounded-md shadow-md">{question.question}</span>
                 <button onClick={()=>handleQuizes(question)} className="p-2 bg-blue-500 flex items-center rounded-md shadow-md text-white hover:bg-blue-400">{currentVideo.quizes?.includes(question._id) ? "Added":"Add"}</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
