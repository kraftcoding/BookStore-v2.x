using Books.Api.Docker.Entities;
using System.Threading;

namespace Books.Api.Docker.Endpoints;

public static class BookEndpoints
{
    public static void MapBookEndpoints(this IEndpointRouteBuilder app)
    {
        var bookGroup = app.MapGroup("api/Books");

        bookGroup.MapGet("", GetAllBooks).WithName(nameof(GetAllBooks));

        bookGroup.MapGet("{id}", GetBook).WithName(nameof(GetBook));

        bookGroup.MapPost("", CreateBook).WithName(nameof(CreateBook));

        bookGroup.MapPut("{id}", UpdateBook).WithName(nameof(UpdateBook));

        //bookGroup.MapDelete("{id}", DeleteBook).WithName(nameof(DeleteBook));
    }

    public static async Task<IResult> GetAllBooks(
        IBookService bookService,
        IRedisCacheService cacheService,
        CancellationToken cancellationToken)
    {
        var cacheKey = "books";

        var response = await cacheService.GetDataAsync<List<BookResponse>>(
            cacheKey,
            cancellationToken);

        if (response is not null)
        {
            return Results.Ok(response);
        }

        var books = await bookService.GetBooksAsync(cancellationToken);

        if (books is null)
        {
            return Results.NotFound();
        }

        response = books.Select(b => b.ToResponseDto()).ToList();

        await cacheService.SetDataAsync<List<BookResponse>>(
            cacheKey,
            response,
            cancellationToken);

        return Results.Ok(books.Select(b => b.ToResponseDto()));
    }

    public static async Task<IResult> GetBook(
         int id,
         IBookService bookService,
         IRedisCacheService cacheService,
         CancellationToken cancellationToken)
    {
        var cacheKey = $"book_{id}";

        var response = await cacheService.GetDataAsync<BookResponse>(
            cacheKey,
            cancellationToken);

        if (response is not null)
        {
            return Results.Ok(response);
        }

        var book = await bookService.GetBookByIdAsync(id, cancellationToken);

        if (book is null)
        {
            return Results.NotFound();
        }

        response = book.ToResponseDto();

        await cacheService.SetDataAsync<BookResponse>(
            cacheKey,
            response,
            cancellationToken);

        return Results.Ok(response);
    }

    public static async Task<IResult> CreateBook(
            CreateBookRequest request,
            IBookService bookService,
            CancellationToken cancellationToken,
            IRedisCacheService cacheService)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        var book = request.ToEntity();

        book.Id = await bookService.CreateBookAsync(book, cancellationToken);

        ClearCacheForBooks(cacheService, cancellationToken);

        return Results.CreatedAtRoute(
            nameof(CreateBook),
            new { id = book.Id },
            book);
    }

    public static async Task<IResult> UpdateBook(
            int id,
            UpdateBookRequest request,
            IBookService bookService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        try
        {
            var cacheKey = $"book_{id}";

            var book = request.ToEntity(id);

            await bookService.UpdateBookAsync(book, cancellationToken);

            ClearCacheForBooks(cacheService, cancellationToken);

            return Results.NoContent();
        }
        catch (Exception ex)
        {
            return Results.NotFound(ex.Message);
        }
    }

    public static async Task<IResult> DeleteBook(
            int id,
            DeleteBookRequest request,
            IBookService bookService,
            IRedisCacheService cacheService,
            CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        try
        {
            var cacheKey = $"book_{request.ISBN}";

            await bookService.DeleteBookByIdAsync(request.ISBN, cancellationToken);

            ClearCacheForBooks(cacheService, cancellationToken);

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

    internal static async void ClearCacheForBooks(IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        var cacheKey = "books";
        await cacheService.RemoveDataAsync(
            cacheKey,
            cancellationToken);
    }

}
