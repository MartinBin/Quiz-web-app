namespace BackEnd.Dto;

public class QuestionDto
{
    public int Id { get; set; }
    public short Type { get; set; }
    public string[] Selected {get; set;}
    public string Email { get; set; }
}