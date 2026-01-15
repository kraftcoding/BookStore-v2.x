namespace Categories.Api.Docker.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this IEndpointRouteBuilder app)
    {
        var categoryGroup = app.MapGroup("api/Categories");

        categoryGroup.MapGet("", GetAllCategories).WithName(nameof(GetAllCategories));

        categoryGroup.MapGet("{id}", GetCategoryById).WithName(nameof(GetCategoryById));

        categoryGroup.MapPost("", CreateCategory).WithName(nameof(CreateCategory));

        categoryGroup.MapPut("{id}", UpdateCategory).WithName(nameof(UpdateCategory));

        categoryGroup.MapDelete("{id}", DeleteCategoryById).WithName(nameof(DeleteCategoryById));
    }

    public static async Task<IResult> GetAllCategories(
        ICategoryService CategoryService,
        CancellationToken cancellationToken)
    {
        var categories = await CategoryService.GetCategoriesAsync(cancellationToken);

        return Results.Ok(categories.Select(b => b.ToResponseDto()));
    }

    public static async Task<IResult> GetCategoryById(
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
            CancellationToken cancellationToken)
    {
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
        try
        {
            var cacheKey = $"category_{id}";

            var category = request.ToEntity(id);

            await CategoryService.UpdateCategoryAsync(category, cancellationToken);

            await cacheService.RemoveDataAsync(cacheKey, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }

    public static async Task<IResult> DeleteCategoryById(
            int id,
            ICategoryService CategoryService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        try
        {
            var cacheKey = $"category_{id}";

            await CategoryService.DeleteCategoryByIdAsync(id, cancellationToken);

            await cacheService.RemoveDataAsync(cacheKey, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }
}
