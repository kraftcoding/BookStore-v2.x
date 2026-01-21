
using Books.Api.Docker.Models;

namespace Books.Api.Docker.Services;

public interface IAuthService
{
    public Task<Response> RegisterAsync(User user, CancellationToken cancellationToken);
    public Task<Response> LoginAsync(LoginUserRequest user, CancellationToken cancellationToken);
    public Task<Response> UpdateAsync(LoginUserRequest user, CancellationToken cancellationToken);
}
