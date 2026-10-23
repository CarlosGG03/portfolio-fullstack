using System.Collections.Concurrent;
using PortfolioAuth.Api.Models;

namespace PortfolioAuth.Api.Services;

public interface IUserService
{
    Task<User?> GetByUsernameAsync(string username);
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateUserAsync(string username, string email, string password, string role = "Admin");
    Task<bool> ValidatePasswordAsync(User user, string password);
}

public class InMemoryUserService : IUserService
{
    private static readonly ConcurrentDictionary<string, User> UsersByUsername = new();

    public InMemoryUserService()
    {
        // Seed default admin if empty
        if (UsersByUsername.IsEmpty)
        {
            var admin = new User
            {
                Id = Guid.NewGuid(),
                Username = "admin",
                Email = "admin@carlosgarzon.dev",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow
            };
            UsersByUsername.TryAdd(admin.Username.ToLower(), admin);
        }
    }

    public Task<User?> GetByUsernameAsync(string username)
    {
        UsersByUsername.TryGetValue(username.ToLower(), out var user);
        return Task.FromResult(user);
    }

    public Task<User?> GetByEmailAsync(string email)
    {
        var user = UsersByUsername.Values.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(user);
    }

    public Task<User> CreateUserAsync(string username, string email, string password, string role = "Admin")
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = username,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            Role = role,
            CreatedAt = DateTime.UtcNow
        };

        UsersByUsername.TryAdd(username.ToLower(), user);
        return Task.FromResult(user);
    }

    public Task<bool> ValidatePasswordAsync(User user, string password)
    {
        bool isValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        return Task.FromResult(isValid);
    }
}
