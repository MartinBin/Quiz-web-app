using BackEnd.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Services;

public class UserService
{
    private readonly ApiContext _context;

    public UserService(ApiContext context)
    {
        _context = context;
    }

    public User createUser(string email, int score)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.Email == email);
        
        if (existingUser != null)
        {
            existingUser.Score = score;
            existingUser.CreatedAt = DateTime.Now;
            _context.Users.Update(existingUser);
            
            _context.SaveChanges();
            return existingUser;
        }
        else
        {
            var newUser = new User
            {
                Email = email,
                Score = score,
                CreatedAt = DateTime.Now
            };
            _context.Users.Add(newUser);
            
            _context.SaveChanges();
            return newUser;
        }
    }

    public List<User> getUsers()
    {
        return _context.Users.ToList().OrderByDescending(u => u.Score).ToList();
    }
}