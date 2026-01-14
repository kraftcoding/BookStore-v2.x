using Books.Api.Docker.Models;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Books.Api.Docker.Services;

public sealed class UserService(ApplicationDbContext context, IConfiguration configuration) : IUserService
{
    public async Task<Response> RegisterAsync(User user, CancellationToken cancellationToken)
    {
        try
        {
            var userExists = await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(b => b.Email == user.Email, cancellationToken);

            if (userExists == null)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                context.Users.Add(user);
                await context.SaveChangesAsync(cancellationToken);

                return new Response { Status = ResponseStatus.Success, Message = "User created successfully!" };
            }
            else
            {
                return new Response { Status = ResponseStatus.Warning, Message = "User already exist!" };
            }
        }
        catch (Exception ex)
        {
            return new Response { Status = ResponseStatus.Error, Message = "User creation failed! Please check user details and try again." };
        }
    }

    public async Task<Response> LoginAsync(LoginUserRequest request, CancellationToken cancellationToken)
    {        
        try
        {
            var dbUser = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (dbUser == null)
            {
                return  new Response { Status = ResponseStatus.Error, Message = "User not found!" };
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, dbUser.Password))
            {
                return new Response { Status = ResponseStatus.Error, Message = "Wrong password!" };
            }

            var token = GenerateToken(dbUser);

            var authResponse = new UserAuthResponse(
                token,
                dbUser.Id,
                dbUser.Name,
                dbUser.Email,
                dbUser.Initials ?? string.Empty
            );

            return new Response { Status = ResponseStatus.Success, Message = "Login successful!", Data = authResponse };

        }
        catch (Exception ex)
        {
            return new Response { Status = ResponseStatus.Error, Message = "Login failed! Please check user details and try again." };
        }       
    }

    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.UTF8.GetBytes(configuration["JWT:Secret"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, "Admin"),
                    new Claim(ClaimTypes.Role, "Customer")
                }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    /*
    public async Task<User?> GetUserByIdAsync(int id, CancellationToken cancellationToken)
          => await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
    public async Task<IEnumerable<User>> GetAllUsersAsync(CancellationToken cancellationToken)
        => await context.Users
        .AsNoTracking()
        .OrderBy(o => o.Id)
        .ToListAsync(cancellationToken);   
    public async Task UpdateUserAsync(User User, CancellationToken cancellationToken)
    {
        var UserObj = await context.Users
             .FirstOrDefaultAsync(b => b.Id == User.Id, cancellationToken);

        if (UserObj is null)
        {
            throw new ArgumentException($"User is not found with Id {User.Id}");
        }

        UserObj.Name = User.Name;
        //UserObj.ISBN = User.ISBN;
        //UserObj.Description = User.Description;
        //UserObj.Author = User.Author;

        await context.SaveChangesAsync(cancellationToken);
    }
    public async Task DeleteUserByIdAsync(int id, CancellationToken cancellationToken)
    {
        var User = await context.Users
             .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);

        if (User is null)
        {
            throw new ArgumentException($"User is not foud Id {id}");
        }

        context.Remove(User);

        await context.SaveChangesAsync(cancellationToken);
    }
    */
}
