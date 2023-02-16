using api.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseCors("NuevaPolitica");

app.MapGet("/", () =>
{
    /*UserData d = new UserData();
    return d.getUsers().Result;*/
    /*string passwordHash = BCrypt.Net.BCrypt.HashPassword("1134",14);
    return passwordHash;*/
    return "Hello world!";
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
