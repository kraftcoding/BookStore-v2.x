using Books.Api.Docker.Models;

namespace Books.Api.Docker.Services;

public sealed class UserService(ApplicationDbContext context) : IUserService
{
    public async Task<User?> GetUserByIdAsync(int id, CancellationToken cancellationToken)
          => await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);

    public async Task<IEnumerable<User>> GetAllUsersAsync(CancellationToken cancellationToken)
        => await context.Users
        .AsNoTracking()
        .OrderBy(o => o.Id)
        .ToListAsync(cancellationToken);

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
                return new Response { Status = "Success", Message = "User created successfully!" };
            }
            else
            {
                return new Response { Status = "Warning", Message = "User already exist!" };
            }
        }
        catch (Exception ex)
        {
            return  new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." };
        }
    }

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
}
