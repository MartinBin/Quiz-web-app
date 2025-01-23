using BackEnd.Models;

namespace BackEnd.Services;

public class QuestionService
{
    private readonly ApiContext _context;

    public QuestionService(ApiContext context)
    {
        _context = context;
    }

    public List<Question> GetQuestions()
    {
        return _context.Questions.ToList();
    }
}