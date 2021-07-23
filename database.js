const books = [
{
    ISBN : "12345book",
    title : "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author:[1,2],
    publication:[1],
    category : ["tech", "programming", "education", "thriller"],
},
];
 
const author =[
    {
        id : 1,
        name : "Rakesh",
        books: ["12345book","Secret"],
    },
    {
        id : 2,
        name : "Elonmusk",
        books: ["12345book"],
    },
];

const publication = [
{
    id :1,
    name :"writex",
    books: ["12345book"],
},
];

module.exports = {books,author, publication};