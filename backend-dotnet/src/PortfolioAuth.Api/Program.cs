using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using PortfolioAuth.Api.DTOs;
using PortfolioAuth.Api.Models;
using PortfolioAuth.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IUserService, InMemoryUserService>();
builder.Services.AddSingleton<IJwtService, JwtService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// Authentication / JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? "super_secret_jwt_key_portfolio_2026_xyz_auth_token_must_be_long_enough";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "PortfolioAuthApi";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "PortfolioClients";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Health Endpoint
app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "PortfolioAuth.Api" }));

// Login Endpoint
app.MapPost("/api/auth/login", async (LoginRequest request, IUserService userService, IJwtService jwtService) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
    {
        return Results.BadRequest(new { message = "Username and password are required." });
    }

    var user = await userService.GetByUsernameAsync(request.Username);
    if (user == null || !await userService.ValidatePasswordAsync(user, request.Password))
    {
        return Results.Unauthorized();
    }

    var token = jwtService.GenerateToken(user);
    return Results.Ok(new AuthResponse(token, user.Username, user.Email, user.Role));
});

// Register Endpoint
app.MapPost("/api/auth/register", async (RegisterRequest request, IUserService userService, IJwtService jwtService) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
        return Results.BadRequest(new { message = "All fields are required." });
    }

    var existing = await userService.GetByUsernameAsync(request.Username);
    if (existing != null)
    {
        return Results.BadRequest(new { message = "Username already taken." });
    }

    var user = await userService.CreateUserAsync(request.Username, request.Email, request.Password, "Admin");
    var token = jwtService.GenerateToken(user);
    return Results.Created($"/api/users/{user.Id}", new AuthResponse(token, user.Username, user.Email, user.Role));
});

// Me Endpoint (Protected)
app.MapGet("/api/auth/me", (ClaimsPrincipal user) =>
{
    var username = user.FindFirst(ClaimTypes.Name)?.Value;
    var email = user.FindFirst(ClaimTypes.Email)?.Value;
    var role = user.FindFirst(ClaimTypes.Role)?.Value;

    if (username == null) return Results.Unauthorized();

    return Results.Ok(new { username, email, role });
}).RequireAuthorization();

app.Run();

// For integration tests
public partial class Program { }
