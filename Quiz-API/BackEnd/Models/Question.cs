namespace BackEnd.Models;

public class Question
{
    public int Id { get; set; }
    public short Type { get; set; }
    public string Content { get; set; }
    public string[] Answers { get; set; }
    public string[] CorrectAnswers { get; set; }
}