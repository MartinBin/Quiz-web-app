using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd;

public class ApiContext : DbContext
{
    public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Question> Questions { get; set; }
}