using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models;

public class User
{
    [Key]
    public string Email { get; set; }
    public int Score { get; set; }
    public DateTime CreatedAt { get; set; }
}