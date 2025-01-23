import React, {useEffect, useState} from 'react';
import {Box, FormControlLabel, RadioGroup, FormGroup, Checkbox, Radio} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from 'axios';

interface Question{
  id: number,
  type: number,
  content: string,
  answers: string[],
}

interface Selection{
  id:number,
  type:number,
  selected: string[]
}

const Quiz = () => {
  const [selected, setSelected] = useState<Selection[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5296/api/Quiz/questions');
        setQuestions(response.data);
      }catch (error){
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleAnswerChange = (questionId: number, type: number, answer: string) => {
    let answers = [] as string[];
    answers.push(answer);
    setSelected((prevSelected) => ({
      ...prevSelected,
      [questionId]: {
        id: questionId,
        type: type,
        selected: answers,
      },
    }));
  };


  const handleRadioChange = (questionId: number, type: number, answer: string) => {
    let answers = [] as string[];
    answers.push(answer);
    setSelected((prevSelected) => ({
      ...prevSelected,
      [questionId]: {
        id: questionId,
        type: type,
        selected: answers,
      },
    }));
  };

  const handleCheckboxChange = (questionId: number, type: number, answer: string, checked: boolean) => {
    setSelected((prevSelected) => {
      const currentAnswers = prevSelected[questionId]?.selected || [];
      const updatedAnswers = checked
        ? [...currentAnswers, answer] // Add answer if checked
        : currentAnswers.filter((a: string) => a !== answer); // Remove answer if unchecked

      return {
        ...prevSelected,
        [questionId]: {
          id: questionId,
          type: type,
          selected: updatedAnswers,
        },
      };
    });
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted with answers:", selected);
  };

  return (
    <form onSubmit={handleSubmit}>
    {questions.map((question) => {
      if(question.type===0){
        return (
          <div key={question.id}>
            <label>{question.content}</label>
            <RadioGroup
            value={selected[question.id]?.selected || ''}
            onChange={(e) => handleRadioChange(question.id,question.type, e.target.value)}>
            {question.answers.map((answer)=>(
              <FormControlLabel value={answer} control={<Radio />} label={answer}/>
            ))}
            </RadioGroup>
          </div>
        );
      }else if(question.type===1){
        return (
          <div key={question.id}>
            <label>{question.content}</label>
            {question.answers.map((answer) => (
              <FormControlLabel
                key={answer}
                control={
                  <Checkbox
                    checked={selected[question.id]?.selected?.includes(answer) || false}
                    onChange={(e) => handleCheckboxChange(question.id,question.type ,answer, e.target.checked)}
                  />
                }
                label={answer}
              />
            ))}
          </div>
        );
      }else if(question.type===2){
          return(
            <div key={question.id}>
              <label>{question.content}</label>
              <input
                type="text"
                value={selected[question.id]?.selected || ''}
                onChange={(e) => handleAnswerChange(question.id,question.type, e.target.value)}
              />
            </div>
          )
      }

      return null;
    })}
    <button type="submit">Submit</button>
  </form>
  )
};

export default Quiz;