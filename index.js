const express= require("express");

const database= require("./database");

const booky = express();

booky.use(express.json());


/* 
route                /
description         get all books
access              PUBLIC
parametre           NONE
methods             GET
*/

booky.get("/", (req,res) => {
 return res.json ({books: database.books});
});

/* 
route                /is
description         get specific books based on ISBN
access              PUBLIC
parametre           isbn
methods             GET
*/

booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if(getSpecificBook.length===0){
        return res.json({ error : `No book found for the ISBN of ${req.params.isbn}`,
    });
    }

    return res.json({book: getSpecificBook});
});

/* 
route                /c
description         get specific books based on category
access              PUBLIC
parametre           category
methods             GET
*/

booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));

    if(getSpecificBook.length===0){
        return res.json({ error : `No book found for the category of ${req.params.category}`,
    });
    }

    return res.json({book: getSpecificBook});

});



/* 
route                /author
description         get all authors
access              PUBLIC
parametre           none
methods             GET
*/

booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});

/* 
route                /author/book
description         get all authors based on books
access              PUBLIC
parametre           isbn
methods             GET
*/

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length===0){
        return res.json({ error : `No Author found for the book of ${req.params.isbn}`,
    });
    }

    return res.json({authors: getSpecificAuthor});
});

/* 
route                /publication
description         get all publications
access              PUBLIC
parametre           none
methods             GET
*/
booky.get("/publication", (req,res) => {
    return res.json({publications: database.publication});
});

/* 
route                /publication/book/:isbn
description         get all publications based on books
access              PUBLIC
parametre           isbn
methods             GET
*/

booky.get("/publication/book/:isbn", (req,res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn));

    if(getSpecificPublication.length===0){
        return res.json({ error : `No Publication found for the book of ${req.params.isbn}`,
    });
    }

    return res.json({publications: getSpecificPublication});
});


/* 
route                /book/add
description         get all publications based on books
access              PUBLIC
parametre           NONE
methods             POST
*/

booky.post("/book/add", (req,res) => {
    const { newBook } = req.body;

    database.books.push(newBook);
    return res.json ({books: database.books});
});

/* 
route                /author/add
description         add new author
access              PUBLIC
parametre           none
methods             POST
*/

booky.post("/author/add", (req,res) => {
    const { newAuthor } = req.body;

    database.author.push(newAuthor);
    return res.json ({author: database.author});
});






/* 
route                /book/update/title
description         update book title
access              PUBLIC
parametre           none
methods             PUT
*/

booky.put("/book/update/title/:isbn", (req,res) => {
    //forEach
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});


/* 
route                /book/update/author
description         update/add new author for a book
access              PUBLIC
parametre           isbn
methods             PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req,res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.authorId) {
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    database.author.forEach((author) => {
        if(author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });
    return res.json({books: database.books, author: database.author});
}); 





booky.listen(3000, () => console.log("Hey server is running"));


//
