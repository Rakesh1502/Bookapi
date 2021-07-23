const express= require("express");

const database= require("./database");

const booky = express();


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
route                /author/book
description         get all authors based on books
access              PUBLIC
parametre           isbn
methods             GET
*/



booky.listen(3000, () => console.log("Hey server is running"));
