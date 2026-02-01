namespace Books.Api.Docker.Endpoints;

public static class BookEndpoints
{
    const string CACHEKEY_BOOKS = "CACHEKEY_BOOKS";
    const string CACHEKEY_BOOK = "CACHEKEY_BOOK_";

    public static void MapBookEndpoints(this IEndpointRouteBuilder app)
    {
        var bookGroup = app.MapGroup("api/Books");

        bookGroup.MapGet("", GetAllBooks).WithName(nameof(GetAllBooks));
        bookGroup.MapGet("{id}", GetBook).WithName(nameof(GetBook));
        bookGroup.MapPost("", CreateBook).WithName(nameof(CreateBook));
        bookGroup.MapPut("{id}", UpdateBook).WithName(nameof(UpdateBook));
        bookGroup.MapPost("/delete", DeleteBook).WithName(nameof(DeleteBook));
    }

    public static async Task<IResult> GetAllBooks(IBookService bookService, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        var response = await cacheService.GetDataAsync<List<BookResponse>>(
            CACHEKEY_BOOKS,
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
            CACHEKEY_BOOKS,
            response,
            cancellationToken);

        return Results.Ok(books.Select(b => b.ToResponseDto()));
    }

    public static async Task<IResult> GetBook(int id, IBookService bookService, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        var cacheKey = CACHEKEY_BOOK + id;

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

    public static async Task<IResult> CreateBook(CreateBookRequest request, IBookService bookService, CancellationToken cancellationToken, IRedisCacheService cacheService)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        var book = request.ToEntity();
        book.Id = await bookService.CreateBookAsync(book, cancellationToken);

        if(book.Id < 0)
        {
            return Results.BadRequest("Failed to create book.");
        }

        ClearCacheForBooks(cacheService, cancellationToken);

        return Results.CreatedAtRoute(
            nameof(CreateBook),
            new { id = book.Id },
            book);
    }

    public static async Task<IResult> UpdateBook(int id, UpdateBookRequest request, IBookService bookService, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }
       
        var book = request.ToEntity(id);
        book.Id = await bookService.UpdateBookAsync(book, cancellationToken);

        if(book.Id < 0) {
            return Results.BadRequest("Failed to update book.");
        }

        var cacheKey = CACHEKEY_BOOK + id;
        ClearCacheForBookId(cacheKey, cacheService, cancellationToken);
        ClearCacheForBooks(cacheService, cancellationToken);

        return Results.NoContent();       
    }

    public static async Task<IResult> DeleteBook(DeleteBookRequest request, IBookService bookService, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        if (!await IsAuthenticated(request.Email, cacheService, cancellationToken))
        {
            return Results.Unauthorized();
        }

        int code = await bookService.DeleteBookByIdAsync(request.ISBN, cancellationToken);

        if (code < 0) {
            return Results.BadRequest("Failed to delete book.");
        }

        ClearCacheForBooks(cacheService, cancellationToken);

        return Results.NoContent();
    }

    internal static async Task<bool> IsAuthenticated(string email, IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        try
        {
            var cacheKey = $"token_{email}";

            var token = await cacheService.GetDataAsync<string>(
                cacheKey,
                cancellationToken);

            if (token is not null) return true;
            
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error clearing cache for books: {ex.Message}");
        }
        
        return false;
    }

    internal static async void ClearCacheForBooks(IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        try
        {            
            await cacheService.RemoveDataAsync(
                CACHEKEY_BOOKS,
                cancellationToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error clearing cache for books: {ex.Message}");
        }       
    }

    internal static async void ClearCacheForBookId(String cacheKey,  IRedisCacheService cacheService, CancellationToken cancellationToken)
    {
        try 
        {
            await cacheService.RemoveDataAsync(
            cacheKey,
            cancellationToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error clearing cache for book");
        }
        
    }

}
