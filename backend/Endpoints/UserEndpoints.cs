namespace Users.Api.Docker.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var UserGroup = app.MapGroup("api/Users");

        //UserGroup.MapGet("", GetAllUsers).WithName(nameof(GetAllUsers));

        //UserGroup.MapGet("{id}", GetUserById).WithName(nameof(GetUserById));

        UserGroup.MapPost("", RegisterUser).WithName(nameof(RegisterUser));

        //UserGroup.MapPut("{id}", UpdateUser).WithName(nameof(UpdateUser));

        //UserGroup.MapDelete("{id}", DeleteUserById).WithName(nameof(DeleteUserById));
    }

    public static async Task<IResult> RegisterUser(
             RegisterUserRequest request,
             IUserService UserService,
             CancellationToken cancellationToken)
    {
        var user = request.ToEntity();        

        var response = await UserService.RegisterAsync(user, cancellationToken);

        return Results.CreatedAtRoute(
            nameof(RegisterUser),
            new { id = user.Id },
            user);
    }

    /*

    public static async Task<IResult> GetAllUsers(
        IUserService UserService,
        CancellationToken cancellationToken)
    {
        var Users = await UserService.GetUsersAsync(cancellationToken);

        return Results.Ok(Users.Select(b => b.ToResponseDto()));
    }

    public static async Task<IResult> GetUserById(
         int id,
         IUserService UserService,
         IRedisCacheService cacheService,
         CancellationToken cancellationToken)
    {
        var cacheKey = $"User_{id}";

        var response = await cacheService.GetDataAsync<UserResponse>(
            cacheKey,
            cancellationToken);

        if (response is not null)
        {
            return Results.Ok(response);
        }

        var User = await UserService.GetUserByIdAsync(id, cancellationToken);

        if (User is null)
        {
            return Results.NotFound();
        }

        response = User.ToResponseDto();

        await cacheService.SetDataAsync<UserResponse>(
            cacheKey,
            response,
            cancellationToken);

        return Results.Ok(response);
    }    

    public static async Task<IResult> UpdateUser(
            int id,
            UpdateUserRequest request,
            IUserService UserService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        try
        {
            var cacheKey = $"User_{id}";

            var User = request.ToEntity(id);

            await UserService.UpdateUserAsync(User, cancellationToken);

            await cacheService.RemoveDataAsync(cacheKey, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }

    public static async Task<IResult> DeleteUserById(
            int id,
            IUserService UserService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        try
        {
            var cacheKey = $"User_{id}";

            await UserService.DeleteUserByIdAsync(id, cancellationToken);

            await cacheService.RemoveDataAsync(cacheKey, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }
    */
}
