namespace Categories.Api.Docker.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        var categoryGroup = app.MapGroup("api/Categories");

        categoryGroup.MapGet("", GetAllCategories).WithName(nameof(GetAllCategories));

        categoryGroup.MapGet("{id}", GetCategory).WithName(nameof(GetCategory));

        categoryGroup.MapPost("", CreateCategory).WithName(nameof(CreateCategory));

        categoryGroup.MapPut("{id}", UpdateCategory).WithName(nameof(UpdateCategory));

        //categoryGroup.MapDelete("{id}", DeleteCategory).WithName(nameof(DeleteCategory));
    }

    public static async Task<IResult> GetAllCategories(
        ICategoryService CategoryService,
        CancellationToken cancellationToken)
    {
        var categories = await CategoryService.GetCategoriesAsync(cancellationToken);

        return Results.Ok(categories.Select(b => b.ToResponseDto()));
    }

    public static async Task<IResult> GetCategory(
         int id,
         ICategoryService CategoryService,
         IRedisCacheService cacheService,
         CancellationToken cancellationToken)
    {
        var cacheKey = $"category_{id}";

        var response = await cacheService.GetDataAsync<CategoryResponse>(
            cacheKey,
            cancellationToken);

        if (response is not null)
        {
            return Results.Ok(response);
        }

        var category = await CategoryService.GetCategoryByIdAsync(id, cancellationToken);

        if (category is null)
        {
            return Results.NotFound();
        }

        response = category.ToResponseDto();

        await cacheService.SetDataAsync<CategoryResponse>(
            cacheKey,
            response,
            cancellationToken);

        return Results.Ok(response);
    }

    public static async Task<IResult> CreateCategory(
             CreateCategoryRequest request,
            ICategoryService CategoryService,
            CancellationToken cancellationToken,
            IRedisCacheService cacheService)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        var category = request.ToEntity();

        category.Id = await CategoryService.CreateCategoryAsync(category, cancellationToken);

        return Results.CreatedAtRoute(
            nameof(CreateCategory),
            new { id = category.Id },
            category);
    }

    public static async Task<IResult> UpdateCategory(
            int id,
            UpdateCategoryRequest request,
            ICategoryService CategoryService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        try
        {
            var cacheKey = $"category_{id}";

            var category = request.ToEntity(id);

            await CategoryService.UpdateCategoryAsync(category, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }

    public static async Task<IResult> DeleteCategory(
            int id,
            DeleteCategoryRequest request,
            ICategoryService CategoryService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        try
        {
            var cacheKey = $"category_{request.Id}";

            await CategoryService.DeleteCategoryByIdAsync(request.Id, cancellationToken);
        
            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
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
}
