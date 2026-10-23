namespace PortfolioAuth.Api.DTOs;

public record RegisterRequest(string Username, string Email, string Password);
public record LoginRequest(string Username, string Password);
public record AuthResponse(string Token, string Username, string Email, string Role);
public record UserDto(Guid Id, string Username, string Email, string Role, DateTime CreatedAt);
