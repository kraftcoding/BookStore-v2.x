namespace Books.Api.Docker.Services;

public sealed class BookService(ApplicationDbContext context) : IBookService
{
    public async Task<Book?> GetBookByIdAsync(int id, CancellationToken cancellationToken)
         => await context.Books
           .AsNoTracking()
           .FirstOrDefaultAsync(b => b.ISBN == id.ToString(), cancellationToken);

    public async Task<IEnumerable<Book>> GetBooksAsync(CancellationToken cancellationToken)
        => await context.Books
        .AsNoTracking()
        .OrderBy(o => o.Id)
        .ToListAsync(cancellationToken);

    public async Task<int> CreateBookAsync(Book book, CancellationToken cancellationToken)
    {

        try
        {
            var existingBook = await context.Books.FirstOrDefaultAsync(b => b.ISBN == book.ISBN, cancellationToken);
            if (existingBook is not null)
            {
                //throw new ArgumentException($"Book with ISBN {book.ISBN} already exists.");
                return -1;
            }

            context.Add(book);
            var category = await context.Categories.FirstOrDefaultAsync(b => b.Name == book.Category, cancellationToken);
            if (category is null && !string.IsNullOrEmpty(book.Category))
            {
                var newCategory = new Category();
                newCategory.Name = book.Category;
                context.Categories.Add(newCategory);
            }

            await context.SaveChangesAsync(cancellationToken);
            return book.Id;
        }
        catch
        {
            return -1;
        }        
    }

    public async Task<int> UpdateBookAsync(Book book, CancellationToken cancellationToken)
    {
        try 
        {
            var bookObj = await context.Books.FirstOrDefaultAsync(b => b.ISBN == book.ISBN, cancellationToken);

            if (bookObj is null)
            {
                throw new ArgumentException($"Book is not found with Id {book.Id}");
            }

            bookObj.Title = book.Title;
            bookObj.ISBN = book.ISBN;
            bookObj.Description = book.Description;
            bookObj.Author = book.Author;
            bookObj.Category = book.Category;
            bookObj.Image = book.Image;

            var category = await context.Categories.FirstOrDefaultAsync(b => b.Name == book.Category, cancellationToken);

            if (category is null && !string.IsNullOrEmpty(book.Category))
            {
                var newCategory = new Category();
                newCategory.Name = book.Category;
                context.Categories.Add(newCategory);
            }

            await context.SaveChangesAsync(cancellationToken);

            return book.Id;
        }
        catch
        {
            return -1;
        }        
    }


    public async Task<int> DeleteBookByIdAsync(string id, CancellationToken cancellationToken)
    {
        try {
            var book = await context.Books.FirstOrDefaultAsync(b => b.ISBN == id, cancellationToken);

            if (book is null)
            {
                return 0;
            }

            var category = book.Category;
            context.Remove(book);
            await context.SaveChangesAsync(cancellationToken);
            book = await context.Books.FirstOrDefaultAsync(b => b.Category == category, cancellationToken);

            if (book is null)
            {
                var categoryToDelete = await context.Categories.FirstOrDefaultAsync(b => b.Name == category, cancellationToken);

                if (categoryToDelete is not null)
                {
                    context.Remove(categoryToDelete);
                    await context.SaveChangesAsync(cancellationToken);
                }
            }

            return 0;
        }
        catch
        {
            return -1;
        }        
    }   
}    
