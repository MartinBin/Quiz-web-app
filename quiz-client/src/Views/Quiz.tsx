import React, {useEffect, useState} from 'react';
import {Stack, Grid2,TextField, Typography, FormControlLabel, RadioGroup, Checkbox, Radio, Container, Button,Box, Stepper,Step,StepLabel} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const steps = ["Answer Radio Button Questions","Answer Checkbox Questions","Answer Textbox Questions","Enter Email"]

const Quiz = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState<Selection[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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
    const answers = [answer];

    setSelected((prevSelected) => {
      const updatedList = prevSelected.map((item) => 
        item.id === questionId 
          ? { ...item, selected: answers }
          : item
      );

      if (!updatedList.some((item) => item.id === questionId)) {
        updatedList.push({ id: questionId, type: type, selected: answers });
      }

      return updatedList;
    });
  };

  const handleCheckboxChange = (questionId: number, type: number, answer: string, checked: boolean) => {
    setSelected((prevSelected) => {
      const updatedList = prevSelected.map((item) => 
        item.id === questionId 
          ? {
              ...item,
              selected: checked
                ? [...item.selected, answer]
                : item.selected.filter((a: string) => a !== answer)
            }
          : item
      );
  
      if (!updatedList.some((item) => item.id === questionId)) {
        updatedList.push({ id: questionId, type: type, selected: checked ? [answer] : [] });
      }
  
      return updatedList;
    });
  };

  const handleEmailEnter = (enteredEmail: string) =>{
    setError(false);
    setEmail(enteredEmail);
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(email==="" || !emailRegex.test(email)) {
      setError(true);
      return;
    }

    try{
      const response = await axios.post(`http://localhost:5296/api/Quiz/submit/${email.toLowerCase()}`,
        selected,
        {
          headers: {
          "Content-Type": "application/json",
          }
        }
      );
      navigate("/results");
    }catch(error){
      console.error(error);
    }
    console.log("Form submitted with answers:", selected);
    console.log("Form submitted from user:", email);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const enterEmail = () =>{
    if (activeStep === steps.length - 1){
      return(
        <>
          <Typography variant="h5" gutterBottom>
            Enter Your Email
          </Typography>
          <TextField error={error} required onChange={(e) => handleEmailEnter(e.target.value)} type="email" id="standard-basic" label="Email" variant="standard" />
        </>
      );
    }
    return <></>
  }

  return (
    <Container maxWidth="sm">

      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {questions.map((question) => {
          if(question.type===0&&activeStep===0){
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
                value={selected.find(x=>x.id==question.id)?.selected || ''}
                onChange={(e) => handleChange(question.id,question.type, e.target.value)}>
                {question.answers.map((answer)=>(
                  <FormControlLabel value={answer} control={<Radio />} label={answer}/>
                ))}
                </RadioGroup>
                </Stack>
              </Box>
            );
          }else if(question.type===1&&activeStep===1){
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
                        checked={selected.find(x=>x.id==question.id)?.selected?.includes(answer) || false}
                        onChange={(e) => handleCheckboxChange(question.id,question.type ,answer, e.target.checked)}
                      />
                    }
                    label={answer}
                  />
                ))}
                </Stack>
              </Box>
            );
          }else if(question.type===2&&activeStep===2){
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
                    value={selected.find(x=>x.id==question.id)?.selected || ''}
                    onChange={(e) => handleChange(question.id,question.type, e.target.value)}
                  />
                  </Stack>
                </Box>
              )
          }
          return null;
        })}
        {enterEmail()}
        <Grid2 container>
          <Grid2>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          </Grid2>
          <Grid2>
            <Button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Grid2>
        </Grid2>
    </Stack>
  </form>
  </Container>
  )
};

export default Quiz;