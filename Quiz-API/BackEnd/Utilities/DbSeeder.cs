using BackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BackEnd.Utilities;

public class DbSeeder
{
    public static void Seed(ApiContext context, IWebHostEnvironment env)
    {
        context.Database.EnsureCreated();

        if (!context.Questions.Any())
        {
            var filePath = Path.Combine(env.ContentRootPath, "Data", "Questions.json");
            var jsonData = File.ReadAllText(filePath);
            
            var questions = JsonConvert.DeserializeObject<List<Question>>(jsonData);
            
            context.Questions.AddRange(questions);
            context.SaveChanges();
        }
    }
}