import React, {useEffect, useState} from 'react';
import {Stack, FormControlLabel, RadioGroup, Checkbox, Radio, Container, Button,Box} from "@mui/material";
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

  const handleChange = (questionId: number, type: number, answer: string) => {
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
        ? [...currentAnswers, answer]
        : currentAnswers.filter((a: string) => a !== answer);

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
    <Container maxWidth="sm">
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {questions.map((question) => {
          if(question.type===0){
            return (
              <Box key={question.id} sx={{
                borderRadius:2,
                bgcolor: '#e0e0e0',
                padding:1,
                boxShadow:3
              }}>
                <Stack>
                <label>{question.content}</label>
                <RadioGroup
                value={selected[question.id]?.selected || ''}
                onChange={(e) => handleChange(question.id,question.type, e.target.value)}>
                {question.answers.map((answer)=>(
                  <FormControlLabel value={answer} control={<Radio />} label={answer}/>
                ))}
                </RadioGroup>
                </Stack>
              </Box>
            );
          }else if(question.type===1){
            return (
              <Box key={question.id} sx={{
                borderRadius:2,
                bgcolor: '#e0e0e0',
                padding:1,
                boxShadow:3
              }}>
                <Stack>
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
                </Stack>
              </Box>
            );
          }else if(question.type===2){
              return(
                <Box key={question.id} sx={{
                  borderRadius:2,
                  bgcolor: '#e0e0e0',
                  padding:1,
                  boxShadow:3
                }}>
                  <Stack>
                  <label>{question.content}</label>
                  <input
                    type="text"
                    value={selected[question.id]?.selected || ''}
                    onChange={(e) => handleChange(question.id,question.type, e.target.value)}
                  />
                  </Stack>
                </Box>
              )
          }

          return null;
        })}
      <Button variant="contained" color='success' type="submit">Submit</Button>
    </Stack>
  </form>
  </Container>
  )
};

export default Quiz;