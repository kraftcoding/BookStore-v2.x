//using Books.Api.Docker.Models;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading;

namespace Auth.Api.Docker.Endpoints;

public static class AuthEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var UserGroup = app.MapGroup("api/Auth");

        UserGroup.MapPost("", RegisterUser).WithName(nameof(RegisterUser));

        UserGroup.MapPost("/loginUser", LoginUser).WithName(nameof(LoginUser));

        UserGroup.MapPut("/updateProfile", UpdateProfile).WithName(nameof(UpdateProfile));
    }

    public static async Task<IResult> RegisterUser(
             RegisterUserRequest request,
             IAuthService UserService,
             CancellationToken cancellationToken)
    {
        var user = request.ToEntity();        

        var response = await UserService.RegisterAsync(user, cancellationToken);

        switch (response.Status)
        {
            case "Error":
                return Results.BadRequest(response.Message);
            case "Conflict":
                return Results.Conflict(response.Message);
        }

        return Results.CreatedAtRoute(
            nameof(RegisterUser),
            new { id = user.Id },
            user);
    }

    // a simple cache based token validation is implemented here instead a middleware validation 
    public static async Task<IResult> LoginUser(
             LoginUserRequest request,
             IAuthService UserService,
             CancellationToken cancellationToken,
              IRedisCacheService cacheService)
    {
        var response = await UserService.LoginAsync(request, cancellationToken);
        switch (response.Status)
        {
            case "Error":
                return Results.BadRequest(response.Message);
            case "Unauthorized":
                return Results.Unauthorized();
        }

        var data = (UserAuthResponse)response.Data;

        StoreUserToken(request.Email, data.Token, cacheService, cancellationToken).Wait();

        return Results.Ok(response);
    }


    // instead validation middleware is used, a simple cache based token validation is implemented here    
    public static async Task<IResult> UpdateProfile(
            UpdateProfileRequest request,
            IAuthService UserService,
            CancellationToken cancellationToken,
            IRedisCacheService cacheService)
    {
        if(!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        var response = await UserService.UpdateAsync(request, cancellationToken);
        switch (response.Status)
        {
            case "Error":
                return Results.BadRequest(response.Message);
            case "Unauthorized":
                return Results.Unauthorized();
        }
        return Results.Ok(response);
    }

    internal static async Task<bool> IsAuthenticated(string email, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {      
        var cacheKey = $"token_{email}";

        var token = await cacheService.GetDataAsync<string>(
            cacheKey,
            cancellationToken);

        if (token is not null) return true;
        else return false;
    }

    internal static async Task StoreUserToken(string email, string token, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        var cacheKey = $"token_{email}";
        await cacheService.SetDataAsync<string>(
            cacheKey,
            token,
            cancellationToken);
    }

}
