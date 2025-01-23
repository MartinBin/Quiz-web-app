using BackEnd;
using BackEnd.Services;
using BackEnd.Utilities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApiContext>(options =>
    options.UseInMemoryDatabase("QuizDbContext"));

builder.Services.AddScoped<CalculationService>();
builder.Services.AddScoped<QuestionService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApiContext>();
    var env = scope.ServiceProvider.GetRequiredService<IWebHostEnvironment>();
    DbSeeder.Seed(context, env);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();