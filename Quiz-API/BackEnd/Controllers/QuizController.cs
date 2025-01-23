using BackEnd.Dto;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class QuizController:ControllerBase
{
    private readonly CalculationService _calculationService;
    private readonly QuestionService _questionService;
    
    public QuizController(CalculationService calculationService,QuestionService questionService)
    {
        _calculationService = calculationService;
        _questionService = questionService;
    }
    
    [HttpPost("calculateScore")]
    public IActionResult calculateScore([FromBody] List<QuestionDto> questions)
    {
        int score = 0;
        foreach (var question in questions)
        {
            switch (question.Type)
            {
                case 0:
                    score+=_calculationService.radioButtonsScore(question);
                    break;
                case 1:
                    score+=_calculationService.checkboxScore(question);
                    break;
                case 2:
                    score+=_calculationService.textboxScore(question);
                    break;
                default:
                    return BadRequest($"Unknown question type: {question.Type}");
            }
        }
        
        return Ok($"Questions processed successfully. Score: {score}");
    }

    [HttpGet("questions")]
    public IActionResult questions()
    {
        var questions = _questionService.GetQuestions()
            .Select(x=>new{x.Id,x.Type,x.Content,x.Answers});
        return Ok(questions);
    }
}