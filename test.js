const bookDB = {
     "book": [
    {
      "id": 1,
      "title": "Dude Perfect 101 Tricks, Tips, and Cool Stuff",
      "Author": "Dude Perfect",
      "Price": 18.39,
      "image": "https://images-na.ssl-images-amazon.com/images/I/71Wdlcm9X7S._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 2,
      "title": "The Last Thing He Told Me: A Novel",
      "Author": "Bessel van der Kolk M.D.",
      "Price": 31,
      "image": "https://images-na.ssl-images-amazon.com/images/I/61NdJMwAThS._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 3,
      "title": "The Midnight Libraryyyyy: A Novel",
      "Author": "Matt Haig",
      "Price": 84,
      "image": "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 4,
      "title": "It Ends with Us: A Novel",
      "Author": "Colleen Hoover",
      "Price": 10.59,
      "image": "https://images-na.ssl-images-amazon.com/images/I/71tqt4VL%2BdS._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 5,
      "title": "American Marxism",
      "Author": "Mark R. Levin",
      "Price": 17.45,
      "image": "https://images-na.ssl-images-amazon.com/images/I/81TgUz%2B7JBS._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 6,
      "title": "Project Hail Mary: A Novel",
      "Author": "Andy Weir",
      "Price": 16.99,
      "image": "https://images-na.ssl-images-amazon.com/images/I/91Bd7P8UwxL._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 7,
      "title": "The Unhoneymooners",
      "Author": "Christina Lauren",
      "Price": 7.22,
      "image": "https://images-na.ssl-images-amazon.com/images/I/711UaUepObS._AC_UL200_SR200,200_.jpg"
    },
    {
      "id": 8,
      "title": "I Love You to the Moon and Back",
      "Author": "Amelia Hepworth",
      "Price": 1.3,
      "image": "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg"
    }]
};

bookDB.book.map((book) =>{
  if(book.id == 2){
    book.Price = 10;
    return book
  }
})

console.log(bookDB);