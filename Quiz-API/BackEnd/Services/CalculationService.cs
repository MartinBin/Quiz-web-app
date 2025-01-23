using BackEnd.Dto;
using BackEnd.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Services;

public class CalculationService
{
    private readonly ApiContext _context;

    public CalculationService(ApiContext context)
    {
        _context = context;
    }
    public int radioButtonsScore(QuestionDto questionDto)
    {
        if (questionDto.Selected.FirstOrDefault() == null) return 0;
        
        Question question = _context.Questions.Where(x=>x.Id==questionDto.Id).First();
        int score = 0;
        if (questionDto.Selected.FirstOrDefault().Equals(question.CorrectAnswers.FirstOrDefault())) score += 100;
        return score;
    }

    public int checkboxScore(QuestionDto questionDto)
    {
        if (questionDto.Selected.FirstOrDefault() == null) return 0;
        
        Question question = _context.Questions.Where(x=>x.Id==questionDto.Id).First();
        int score = 0;
        int correctAnswers = 0;
        int goodAnswers = question.CorrectAnswers.Length;
        foreach (var selected in questionDto.Selected)
        {
            if (question.CorrectAnswers.Contains(selected))
            {
                correctAnswers++;
            }
        }
        score = (int)Math.Ceiling((double)((100/goodAnswers)*correctAnswers));
        return score;
    }

    public int textboxScore(QuestionDto questionDto)
    {
        if (questionDto.Selected.FirstOrDefault() == null) return 0;
        
        Question question = _context.Questions.Where(x=>x.Id==questionDto.Id).First();
        int score = 0;
        string correctAnswer = question.CorrectAnswers.FirstOrDefault().ToLower();
        string selected = questionDto.Selected.FirstOrDefault().ToLower();
        
        if (correctAnswer.Equals(selected)) score += 100;
        return score;
    }
}