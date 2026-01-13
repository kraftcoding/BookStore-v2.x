
using Books.Api.Docker.Models;

namespace Books.Api.Docker.Services;

public interface IUserService
{
    public Task<IEnumerable<User>> GetAllUsersAsync(CancellationToken cancellationToken);
    public Task<User?> GetUserByIdAsync(int id, CancellationToken cancellationToken);
    public Task<Response> RegisterAsync(User user, CancellationToken cancellationToken);
    public Task UpdateUserAsync(User user, CancellationToken cancellationToken);
    public Task DeleteUserByIdAsync(int id, CancellationToken cancellationToken);
}
