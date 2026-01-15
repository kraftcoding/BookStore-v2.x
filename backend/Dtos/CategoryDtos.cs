namespace Books.Api.Docker.Dtos;

public sealed record CreateCategoryRequest(
    string Name);

public sealed record CategoryResponse(
    int Id,
    string Name);

public sealed record UpdateCategoryRequest(
    int Id,
    string Name);

