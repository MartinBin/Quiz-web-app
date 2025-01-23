namespace BackEnd.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; }
}